import fastify from 'fastify';
import cors from '@fastify/cors';
import { VERSION } from '@inspect-ai/shared';

async function startServer() {
  const server = fastify();

  await server.register(cors);

  server.get('/', async () => {
    return { version: VERSION };
  });

  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
