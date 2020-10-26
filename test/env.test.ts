import 'reflect-metadata';

import {describe, it} from 'mocha';
import {expect} from 'chai';

import Env from '../src/env';

describe('test: Environment', () => {
  it('expect: throw', async () => {
    delete process.env.TRANSPORT_HOST;
    delete process.env.TRANSPORT_PORT;
    delete process.env.TRANSPORT_SECURE;
    delete process.env.TRANSPORT_AUTH_USER;
    delete process.env.TRANSPORT_AUTH_PASS;
    delete process.env.AMQP_URL;
    delete process.env.AMQP_QUEUE;

    expect(() => Env()).to.throw('environment: error');
  });

  it('expect: no throw', async () => {
    process.env.TRANSPORT_HOST = 'test';
    process.env.TRANSPORT_PORT = 'test';
    process.env.TRANSPORT_SECURE = 'test';
    process.env.TRANSPORT_AUTH_USER = 'test';
    process.env.TRANSPORT_AUTH_PASS = 'test';
    process.env.AMQP_URL = 'test';
    process.env.AMQP_QUEUE = 'test';

    expect(() => Env()).does.not.throw('environment: error');
  });
});
