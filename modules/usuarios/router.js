const { UsuarioService } = require('./service');
const {
  Revisar_JSON_Crear_User,
  Revisar_JSON_Editar_User
} = require('./schema');
const { abrir_puerta_bd } = require('../../database/almacen');

async function router(fastify) {
  fastify.post('/', {
    schema: { body: Revisar_JSON_Crear_User },
    handler: async (request, reply) => {
      const db = abrir_puerta_bd();
      const datos = request.body;
      const usuario = await UsuarioService.crear_usuario(db, datos);
      return reply.code(201).send(usuario);
    }
  });

  fastify.get('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          limite: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
          salto: { type: 'integer', minimum: 0, default: 0 }
        }
      }
    },
    handler: async (request) => {
      const db = abrir_puerta_bd();
      const { limite = 10, salto = 0 } = request.query;
      return UsuarioService.listar_usuarios(db, limite, salto);
    }
  });

  fastify.get('/:user_id', {
    schema: {
      params: {
        type: 'object',
        required: ['user_id'],
        properties: { user_id: { type: 'integer', minimum: 1 } }
      }
    },
    handler: async (request) => {
      const db = abrir_puerta_bd();
      return UsuarioService.obtener_por_id(db, request.params.user_id);
    }
  });

  fastify.put('/:user_id', {
    schema: {
      params: {
        type: 'object',
        required: ['user_id'],
        properties: { user_id: { type: 'integer', minimum: 1 } }
      },
      body: Revisar_JSON_Editar_User
    },
    handler: async (request) => {
      const db = abrir_puerta_bd();
      return UsuarioService.actualizar_usuario(
        db,
        request.params.user_id,
        request.body
      );
    }
  });

  fastify.delete('/:user_id', {
    schema: {
      params: {
        type: 'object',
        required: ['user_id'],
        properties: { user_id: { type: 'integer', minimum: 1 } }
      }
    },
    handler: async (request, reply) => {
      const db = abrir_puerta_bd();
      UsuarioService.eliminar_usuario(db, request.params.user_id);
      return reply.code(204).send();
    }
  });
}

module.exports = router;
