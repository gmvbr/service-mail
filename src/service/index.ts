import {FastifyInstance} from 'fastify';
import {autoInjectable, inject} from 'tsyringe';

import TodoModel from '../repository/model/todo';

@autoInjectable()
class Service {
  constructor(
    @inject('FastifyInstance') fastify?: FastifyInstance,
    model?: TodoModel
  ) {
    fastify!.get('/service', (_, reply) => {
      reply.send(model!.status());
    });
  }
}

export default async () => new Service();
