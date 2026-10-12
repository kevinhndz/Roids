import 'dotenv/config';
import { closeSync, mkdirSync, openSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'prisma/config';

const url = process.env.DATABASE_URL || 'file:./database/roids.sqlite';
const databasePath = resolve(url.slice('file:'.length));

mkdirSync(dirname(databasePath), { recursive: true });
closeSync(openSync(databasePath, 'a'));

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: { path: './prisma/migrations' },
  datasource: {
    url
  }
});
