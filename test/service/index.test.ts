import {describe, it} from 'mocha';

import {expect} from 'chai';
import Server from '../../src/server';

describe('test Service', () => {
  process.env.MONGO_URL = 'mongodb://localhost:27017';
  process.env.MONGO_USER = 'root';
  process.env.MONGO_PASSWORD = 'test';
  process.env.MONGO_DB = 'test';
  process.env.AMQPLIB_URL = 'amqp://localhost:5672';

  Server.initialize();

  before(async () => Server.fastify!.listen(0));
  after(async () => Server.fastify!.close());

  it('test service', async () => {
    const response = await Server.fastify!.inject({
      method: 'get',
      url: '/service',
    });
    expect(response.json()).to.equal(true);
  });
});
