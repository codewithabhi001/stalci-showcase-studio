import { Client } from 'pg';

async function main() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password123@localhost:5433/stalci_db?schema=public';
  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connected to local dev DB, resetting public schema...');
  await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  console.log('Schema reset complete.');
  await client.end();
}

main().catch(console.error);
