class UsuarioRepository {
  static async obtener_todos(db, limite = 100, salto = 0) {
    return db.users.findMany({
      skip: salto,
      take: limite,
      orderBy: { id: 'asc' }
    });
  }

  static async buscar_por_id(db, user_id) {
    return db.users.findUnique({ where: { id: user_id } });
  }

  static async buscar_por_user(db, user) {
    return db.users.findUnique({ where: { user } });
  }

  static async crear(db, nuevo_usuario) {
    return db.users.create({ data: nuevo_usuario });
  }

  static async actualizar(db, usuario_db, datos_nuevos) {
    return db.users.update({
      where: { id: usuario_db.id },
      data: datos_nuevos
    });
  }

  static async eliminar(db, usuario_db) {
    await db.users.delete({ where: { id: usuario_db.id } });
    return true;
  }
}

export { UsuarioRepository };
