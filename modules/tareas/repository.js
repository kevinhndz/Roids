class TareasRepository {
  static async ver_tareas(db, limite = 10, salto = 0) {
    return db.tareas.findMany({
      skip: salto,
      take: limite,
      orderBy: { id: 'asc' }
    });
  }

  static async crear_nueva_tarea(db, nueva_tarea) {
    return db.tareas.create({
      data: {
        titulo: nueva_tarea.titulo,
        descripcion: nueva_tarea.descripcion ?? null,
        prioridad: nueva_tarea.prioridad,
        user_id: nueva_tarea.user_id
      }
    });
  }
}

export { TareasRepository };
