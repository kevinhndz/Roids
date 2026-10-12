import { verificar_token } from './jwt_util.js';

function el_vigilante(request) {
  const token = request.headers.token;

  if (typeof token !== 'string' || token.length === 0) {
    const error = new Error('Falta el token.');
    error.statusCode = 401;
    throw error;
  }

  return verificar_token(token);
}

function permiso_admin(request) {
  const json = el_vigilante(request);

  if (json.rol !== 'Admin') {
    const error = new Error('No estas autorizado para consumir este recurso!');
    error.statusCode = 403;
    throw error;
  }

  return json;
}

function permiso_user(request) {
  const json = el_vigilante(request);

  if (['user', 'admin'].includes(json.rol)) {
    return json;
  }

  const error = new Error('No tienes permiso');
  error.statusCode = 403;
  throw error;
}

export { el_vigilante, permiso_admin, permiso_user };
