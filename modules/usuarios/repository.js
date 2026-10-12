const { Users } = require('./models');

function convertir_usuario(row) {
  return row ? new Users(row) : null;
}

class UsuarioRepository {
  static obtener_todos(db, limite = 100, salto = 0) {
    return db.prepare('SELECT * FROM "Users" ORDER BY id LIMIT ? OFFSET ?')
      .all(limite, salto)
      .map(convertir_usuario);
  }

  static buscar_por_id(db, user_id) {
    return convertir_usuario(
      db.prepare('SELECT * FROM "Users" WHERE id = ?').get(user_id)
    );
  }

  static buscar_por_user(db, user) {
    return convertir_usuario(
      db.prepare('SELECT * FROM "Users" WHERE user = ?').get(user)
    );
  }

  static crear(db, nuevo_usuario) {
    const resultado = db.prepare(
      'INSERT INTO "Users" (user, password, rol, name, email, phone_number) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
      nuevo_usuario.user,
      nuevo_usuario.password,
      nuevo_usuario.rol,
      nuevo_usuario.name,
      nuevo_usuario.email,
      nuevo_usuario.phone_number ?? null
    );

    return this.buscar_por_id(db, Number(resultado.lastInsertRowid));
  }

  static actualizar(db, usuario_db, datos_nuevos) {
    const cambios = ['name = ?', 'email = ?'];
    const valores = [datos_nuevos.name, datos_nuevos.email];

    if (Object.hasOwn(datos_nuevos, 'phone_number')) {
      cambios.push('phone_number = ?');
      valores.push(datos_nuevos.phone_number);
    }

    valores.push(usuario_db.id);
    db.prepare(`UPDATE "Users" SET ${cambios.join(', ')} WHERE id = ?`).run(...valores);

    return this.buscar_por_id(db, usuario_db.id);
  }

  static eliminar(db, usuario_db) {
    db.prepare('DELETE FROM "Users" WHERE id = ?').run(usuario_db.id);
    return true;
  }
}

module.exports = { UsuarioRepository };
