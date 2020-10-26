import {FastifyInstance} from 'fastify';
import {container} from 'tsyringe';

import Channel from './singleton/channel';
import Database from './singleton/database';

async function IoC(fastify: FastifyInstance) {
  container.registerInstance<FastifyInstance>('FastifyInstance', fastify);

  const channel = container.resolve(Channel);
  const database = container.resolve(Database);

  await channel.initialize();
  await database.initialize();

  fastify.addHook('onClose', async () => {
    channel.close();
    database.close();
  });
}

export default IoC;
