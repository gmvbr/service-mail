import 'reflect-metadata';

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {container} from 'tsyringe';
import Channel from '../../src/repository/singleton/channel';

describe('test channel', () => {
  const channel = container.resolve(Channel);

  it('initialize', async () => {
    process.env.AMQPLIB_URL = 'amqp://localhost:5672';
    await channel.initialize();
    expect(channel.conn).to.not.be.null;
    await channel.close();
  });
});
