const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
require('dotenv').config();

const ubicacion = process.env.DATABASE_PATH || './database/roids.sqlite';
const ubicacionCompleta = ubicacion === ':memory:' ? ubicacion : path.resolve(ubicacion);

if (ubicacion !== ':memory:') {
  fs.mkdirSync(path.dirname(ubicacionCompleta), { recursive: true });
}

const motor = new DatabaseSync(ubicacionCompleta, { timeout: 5000 });
motor.exec('PRAGMA foreign_keys = ON');
motor.exec(fs.readFileSync(path.join(__dirname, 'esquema.sql'), 'utf8'));

function abrir_puerta_bd() {
  return motor;
}

function cerrar_puerta_bd() {
  motor.close();
}

module.exports = { motor, abrir_puerta_bd, cerrar_puerta_bd };
