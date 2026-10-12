const Revisar_JSON_nueva_tarea = {
  type: 'object',
  required: ['titulo', 'user_id'],
  properties: {
    titulo: { type: 'string', minLength: 3, maxLength: 40 },
    descripcion: { type: ['string', 'null'], maxLength: 250, default: null },
    prioridad: { type: 'string', enum: ['Baja', 'Media', 'Alta'], default: 'Media' },
    user_id: { type: 'integer', minimum: 1 }
  }
};

const Revisar_JSON_editar_tarea = {
  type: 'object',
  properties: {
    titulo: { type: 'string', minLength: 3, maxLength: 40 },
    descripcion: { type: ['string', 'null'], maxLength: 250 },
    prioridad: { type: 'string', enum: ['Baja', 'Media', 'Alta'] },
    completada: { type: 'boolean' }
  }
};

const TareaRespuestaDTO = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    titulo: { type: 'string' },
    descripcion: { type: ['string', 'null'] },
    completada: { type: 'boolean' },
    prioridad: { type: 'string' },
    user_id: { type: 'integer' },
    created_at: { type: 'string' }
  }
};

export {
  Revisar_JSON_nueva_tarea,
  Revisar_JSON_editar_tarea,
  TareaRespuestaDTO
};
