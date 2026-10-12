import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client.ts';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./database/roids.sqlite'
});

const motor = new PrismaClient({ adapter });

function abrir_puerta_bd() {
  return motor;
}

async function cerrar_puerta_bd() {
  await motor.$disconnect();
}

export { motor, abrir_puerta_bd, cerrar_puerta_bd };
