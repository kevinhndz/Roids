class Tareas {
  constructor(datos) {
    this.id = datos.id;
    this.titulo = datos.titulo;
    this.descripcion = datos.descripcion;
    this.completada = Boolean(datos.completada);
    this.prioridad = datos.prioridad;
    this.fecha_limite = datos.fecha_limite;
    this.user_id = datos.user_id;
    this.created_at = datos.created_at;
  }
}

module.exports = { Tareas };
