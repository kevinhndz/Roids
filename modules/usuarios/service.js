const { Users } = require('./models');
const { UsuarioRepository } = require('./repository');
const { encriptar_contrasena } = require('../../utils/hash_util');

function respuesta_usuario(usuario) {
  return {
    id: usuario.id,
    user: usuario.user,
    rol: usuario.rol,
    name: usuario.name,
    email: usuario.email,
    phone_number: usuario.phone_number
  };
}

class UsuarioService {
  static async crear_usuario(db, datos) {
    if (UsuarioRepository.buscar_por_user(db, datos.user)) {
      const error = new Error('El nombre de usuario ya esta en uso.');
      error.statusCode = 400;
      throw error;
    }

    const password_encriptada = await encriptar_contrasena(datos.password);
    const nuevo_usuario = new Users({
      user: datos.user,
      password: password_encriptada,
      rol: datos.rol,
      name: datos.name,
      email: datos.email,
      phone_number: datos.phone_number
    });

    return respuesta_usuario(UsuarioRepository.crear(db, nuevo_usuario));
  }

  static obtener_por_id(db, user_id) {
    const usuario = UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    return respuesta_usuario(usuario);
  }

  static listar_usuarios(db, limite = 100, salto = 0) {
    return UsuarioRepository.obtener_todos(db, limite, salto).map(respuesta_usuario);
  }

  static actualizar_usuario(db, user_id, datos) {
    const usuario = UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    return respuesta_usuario(UsuarioRepository.actualizar(db, usuario, datos));
  }

  static eliminar_usuario(db, user_id) {
    const usuario = UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    return UsuarioRepository.eliminar(db, usuario);
  }
}

module.exports = { UsuarioService, respuesta_usuario };
