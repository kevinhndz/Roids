import { Revisar_JSON_nueva_tarea, TareaRespuestaDTO } from './schema.js';
import { TareasService as service } from './service.js';
import { abrir_puerta_bd } from '../../database/almacen.js';

async function router(fastify) {
  fastify.post('/', {
    schema: {
      body: Revisar_JSON_nueva_tarea,
      response: { 200: TareaRespuestaDTO }
    },
    handler: async (request) => {
      const db = abrir_puerta_bd();
      const json = request.body;
      return service.crear_tarea(db, json);
    }
  });

  fastify.get('/', {
    schema: { response: { 200: { type: 'array', items: TareaRespuestaDTO } } },
    handler: async () => {
      const db = abrir_puerta_bd();
      return service.ver_tareas(db);
    }
  });
}

export default router;
