import { UsuarioRepository } from './repository.js';
import { encriptar_contrasena } from '../../utils/hash_util.js';

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
    if (await UsuarioRepository.buscar_por_user(db, datos.user)) {
      const error = new Error('El nombre de usuario ya esta en uso.');
      error.statusCode = 400;
      throw error;
    }

    const password_encriptada = await encriptar_contrasena(datos.password);
    const nuevo_usuario = {
      user: datos.user,
      password: password_encriptada,
      rol: datos.rol,
      name: datos.name,
      email: datos.email,
      phone_number: datos.phone_number
    };

    return respuesta_usuario(await UsuarioRepository.crear(db, nuevo_usuario));
  }

  static async obtener_por_id(db, user_id) {
    const usuario = await UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    return respuesta_usuario(usuario);
  }

  static async listar_usuarios(db, limite = 100, salto = 0) {
    const usuarios = await UsuarioRepository.obtener_todos(db, limite, salto);
    return usuarios.map(respuesta_usuario);
  }

  static async actualizar_usuario(db, user_id, datos) {
    const usuario = await UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    const usuario_actualizado = await UsuarioRepository.actualizar(db, usuario, datos);
    return respuesta_usuario(usuario_actualizado);
  }

  static async eliminar_usuario(db, user_id) {
    const usuario = await UsuarioRepository.buscar_por_id(db, user_id);

    if (!usuario) {
      const error = new Error('El usuario no existe.');
      error.statusCode = 404;
      throw error;
    }

    return UsuarioRepository.eliminar(db, usuario);
  }
}

export { UsuarioService, respuesta_usuario };
