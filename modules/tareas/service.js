const { Tareas } = require('./models');
const { TareasRepository: repo } = require('./repository');

class TareasService {
  static crear_tarea(db, json) {
    const nueva_tarea = new Tareas({
      titulo: json.titulo,
      descripcion: json.descripcion,
      prioridad: json.prioridad,
      user_id: json.user_id
    });

    return repo.crear_nueva_tarea(db, nueva_tarea);
  }

  static ver_tareas(db) {
    return repo.ver_tareas(db, 10, 0);
  }
}

module.exports = { TareasService };
