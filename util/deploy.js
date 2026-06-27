// util/deploy.js
// Reads all domain JSON files and upserts DNS records via Cloudflare API

const fs = require("fs");
const path = require("path");

const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const BASE_DOMAIN = process.env.BASE_DOMAIN || "is-a.mbbs.in"; // your root domain

if (!CF_API_TOKEN || !CF_ZONE_ID) {
  console.error("❌ Missing CF_API_TOKEN or CF_ZONE_ID environment variables.");
  process.exit(1);
}

const DOMAINS_DIR = path.join(__dirname, "../domains");
const CF_BASE = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`;

const headers = {
  Authorization: `Bearer ${CF_API_TOKEN}`,
  "Content-Type": "application/json",
};

async function getExistingRecords() {
  const res = await fetch(CF_BASE, { headers });
  const data = await res.json();
  return data.result || [];
}

async function upsertRecord(name, type, content, priority) {
  const existing = (await getExistingRecords()).find(
    (r) => r.name === `${name}.${BASE_DOMAIN}` && r.type === type
  );

  const body = {
    type,
    name: `${name}.${BASE_DOMAIN}`,
    content,
    ttl: 1, // auto
    proxied: false,
    ...(priority !== undefined ? { priority } : {}),
  };

  if (existing) {
    const res = await fetch(`${CF_BASE}/${existing.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(`  ↻ Updated ${type} for ${name}: ${data.success ? "✅" : "❌"}`);
  } else {
    const res = await fetch(CF_BASE, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(`  + Created ${type} for ${name}: ${data.success ? "✅" : "❌"}`);
  }
}

async function main() {
  const files = fs.readdirSync(DOMAINS_DIR).filter((f) => f.endsWith(".json"));
  console.log(`\n🚀 Deploying ${files.length} domain(s) to ${BASE_DOMAIN}...\n`);

  for (const file of files) {
    const subdomain = file.replace(".json", "");
    const data = JSON.parse(fs.readFileSync(path.join(DOMAINS_DIR, file), "utf8"));
    const record = data.record;

    console.log(`Processing: ${subdomain}.${BASE_DOMAIN}`);

    if (record.CNAME) {
      await upsertRecord(subdomain, "CNAME", record.CNAME);
    }
    if (record.A) {
      for (const ip of Array.isArray(record.A) ? record.A : [record.A]) {
        await upsertRecord(subdomain, "A", ip);
      }
    }
    if (record.AAAA) {
      for (const ip of Array.isArray(record.AAAA) ? record.AAAA : [record.AAAA]) {
        await upsertRecord(subdomain, "AAAA", ip);
      }
    }
    if (record.TXT) {
      for (const txt of Array.isArray(record.TXT) ? record.TXT : [record.TXT]) {
        await upsertRecord(subdomain, "TXT", txt);
      }
    }
    if (record.MX) {
      for (const mx of Array.isArray(record.MX) ? record.MX : [record.MX]) {
        await upsertRecord(subdomain, "MX", mx.value, mx.priority);
      }
    }
  }

  console.log("\n✅ Deployment complete.\n");
}

main().catch((err) => {
  console.error("❌ Deploy error:", err);
  process.exit(1);
});
