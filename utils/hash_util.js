const bcrypt = require('bcryptjs');

const motor = bcrypt;

async function encriptar_contrasena(password) {
  return motor.hash(password, 12);
}

async function verificar_contrasena(password_plano, password_hasheado) {
  return motor.compare(password_plano, password_hasheado);
}

module.exports = { motor, encriptar_contrasena, verificar_contrasena };
