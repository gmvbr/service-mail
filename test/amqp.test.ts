import 'reflect-metadata';

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {container} from 'tsyringe';

import Amqp from '../src/repository/amqp';

describe('test: Amqp', () => {
  const amqp = container.resolve(Amqp);

  it('test connection', async () => {
    process.env.AMQP_URL = 'amqp://localhost:5672';
    await amqp.initialize();
    expect(amqp.connection).to.not.be.null;
    expect(amqp.connection).to.not.be.undefined;
    await amqp.close();
  });
});
