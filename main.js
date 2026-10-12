require('dotenv').config();
const Fastify = require('fastify');
const { cerrar_puerta_bd } = require('./database/almacen');
const usuarios_router = require('./modules/usuarios/router');
const tareas_router = require('./modules/tareas/router');

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test',
  ajv: { plugins: [require('ajv-formats')] }
});

app.addHook('onClose', async () => {
  cerrar_puerta_bd();
});

app.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    const contexto = error.validationContext || 'body';
    const detail = error.validation.map((item) => ({
      loc: [contexto, ...item.instancePath.split('/').filter(Boolean)],
      msg: item.message || 'Valor invalido',
      type: item.keyword
    }));

    return reply.code(422).send({ detail });
  }

  const statusCode = error.statusCode || 500;

  if (statusCode < 500) {
    return reply.code(statusCode).send({ detail: error.message });
  }

  request.log.error(error);
  return reply.code(statusCode).send({
    detail: 'Ocurrio un error interno en el servidor.'
  });
});

app.get('/', async () => ({ message: 'To-Do List Pro' }));
app.register(usuarios_router, { prefix: '/usuarios' });
app.register(tareas_router, { prefix: '/tareas' });

async function iniciar() {
  const port = Number(process.env.PORT || 8000);
  const host = process.env.HOST || '127.0.0.1';
  await app.listen({ port, host });
}

if (require.main === module) {
  iniciar().catch(async (error) => {
    app.log.error(error);
    await app.close();
    process.exitCode = 1;
  });
}

module.exports = { app, iniciar };
