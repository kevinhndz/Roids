require('dotenv').config();
const jwt = require('jsonwebtoken');

const LLAVE = process.env.LLAVE_SECRETA;

function crear_token(user, user_id, rol) {
  if (!LLAVE) {
    throw new Error('Falta configurar LLAVE_SECRETA en el archivo .env');
  }

  return jwt.sign({ user, user_id, rol }, LLAVE, {
    algorithm: 'HS256',
    expiresIn: '20m'
  });
}

function verificar_token(token) {
  if (!LLAVE) {
    throw new Error('Falta configurar LLAVE_SECRETA en el archivo .env');
  }

  try {
    return jwt.verify(token, LLAVE, { algorithms: ['HS256'] });
  } catch {
    const error = new Error('Sesion expirada o token invalido');
    error.statusCode = 401;
    throw error;
  }
}

module.exports = { LLAVE, crear_token, verificar_token };
