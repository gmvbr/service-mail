import Fastify, {FastifyInstance} from 'fastify';

import FastifyHelmet from 'fastify-helmet';
import FastifySensible from 'fastify-sensible';

import Service from './service';
import IoC from './repository';

class Application {
  static fastify?: FastifyInstance;

  static async initialize() {
    this.fastify = Fastify({
      logger: process.env.NODE_ENV !== 'production',
    });
    this.plugins();
  }

  private static plugins() {
    this.fastify!.register(IoC)
      .register(FastifyHelmet)
      .register(FastifySensible)
      .register(Service);
  }
}

export default Application;
