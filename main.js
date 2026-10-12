import 'dotenv/config';
import Fastify from 'fastify';
import addFormats from 'ajv-formats';
import { cerrar_puerta_bd } from './database/almacen.js';
import usuarios_router from './modules/usuarios/router.js';
import tareas_router from './modules/tareas/router.js';

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test',
  ajv: { plugins: [addFormats] }
});

app.addHook('onClose', async () => {
  await cerrar_puerta_bd();
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

if (import.meta.main) {
  iniciar().catch(async (error) => {
    app.log.error(error);
    await app.close();
    process.exitCode = 1;
  });
}

export { app, iniciar };
