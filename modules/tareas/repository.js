const { Tareas } = require('./models');

function convertir_fecha(fecha) {
  if (!fecha) {
    return fecha;
  }

  const valor = fecha.includes('T') ? fecha : `${fecha.replace(' ', 'T')}Z`;
  return new Date(valor).toISOString();
}

function convertir_tarea(row) {
  if (!row) {
    return null;
  }

  return new Tareas({ ...row, created_at: convertir_fecha(row.created_at) });
}

class TareasRepository {
  static ver_tareas(db, limite = 10, salto = 0) {
    return db.prepare(
      'SELECT * FROM "Tareas" ORDER BY id LIMIT ? OFFSET ?'
    ).all(limite, salto).map(convertir_tarea);
  }

  static crear_nueva_tarea(db, nueva_tarea) {
    const resultado = db.prepare(
      'INSERT INTO "Tareas" (titulo, descripcion, prioridad, user_id) VALUES (?, ?, ?, ?)'
    ).run(
      nueva_tarea.titulo,
      nueva_tarea.descripcion ?? null,
      nueva_tarea.prioridad,
      nueva_tarea.user_id
    );

    return convertir_tarea(
      db.prepare('SELECT * FROM "Tareas" WHERE id = ?').get(Number(resultado.lastInsertRowid))
    );
  }
}

module.exports = { TareasRepository };
