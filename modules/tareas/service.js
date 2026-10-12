import { TareasRepository as repo } from './repository.js';

class TareasService {
  static async crear_tarea(db, json) {
    const nueva_tarea = {
      titulo: json.titulo,
      descripcion: json.descripcion,
      prioridad: json.prioridad,
      user_id: json.user_id
    };

    return repo.crear_nueva_tarea(db, nueva_tarea);
  }

  static async ver_tareas(db) {
    return repo.ver_tareas(db, 10, 0);
  }
}

export { TareasService };
