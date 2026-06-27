// util/validate.js
// Validates all domain JSON files in the /domains folder

const fs = require("fs");
const path = require("path");

const DOMAINS_DIR = path.join(__dirname, "../domains");
const VALID_RECORD_TYPES = ["CNAME", "A", "AAAA", "TXT", "MX", "URL"];

let errors = [];
let valid = 0;

const files = fs.readdirSync(DOMAINS_DIR).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const filePath = path.join(DOMAINS_DIR, file);
  const subdomain = file.replace(".json", "");

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    errors.push(`[${file}] Invalid JSON: ${e.message}`);
    continue;
  }

  // Validate subdomain name
  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    errors.push(`[${file}] Subdomain must be lowercase alphanumeric and hyphens only.`);
  }

  // Validate required fields
  if (!data.owner || !data.owner.username) {
    errors.push(`[${file}] Missing required field: owner.username`);
  }

  if (!data.record || typeof data.record !== "object") {
    errors.push(`[${file}] Missing or invalid 'record' field.`);
  } else {
    const recordTypes = Object.keys(data.record);
    const unknownTypes = recordTypes.filter((t) => !VALID_RECORD_TYPES.includes(t));
    if (unknownTypes.length > 0) {
      errors.push(`[${file}] Unknown record types: ${unknownTypes.join(", ")}`);
    }

    // CNAME must not coexist with A/AAAA
    if (data.record.CNAME && (data.record.A || data.record.AAAA)) {
      errors.push(`[${file}] CNAME cannot coexist with A or AAAA records.`);
    }
  }

  valid++;
}

if (errors.length > 0) {
  console.error("\n❌ Validation failed:\n");
  errors.forEach((e) => console.error("  " + e));
  process.exit(1);
} else {
  console.log(`\n✅ All ${valid} domain file(s) are valid.\n`);
}
