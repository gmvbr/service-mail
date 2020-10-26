import 'reflect-metadata';

import {describe, it} from 'mocha';
import {createTestAccount} from 'nodemailer';
import {container} from 'tsyringe';

import Amqp from '../src/repository/amqp';
import Mailer from '../src/repository/mailer';
import main from '../src/loader';

describe('test: index', () => {
  it('test main', async () => {
    const account = await createTestAccount();

    process.env.AMQP_URL = 'amqp://localhost:5672';
    process.env.AMQP_QUEUE = 'mail';
    process.env.TRANSPORT_HOST = account.smtp.host;
    process.env.TRANSPORT_PORT = `${account.smtp.port}`;
    process.env.TRANSPORT_SECURE = `${account.smtp.secure}`;
    process.env.TRANSPORT_AUTH_USER = account.user;
    process.env.TRANSPORT_AUTH_PASS = account.pass;

    await main();
    await container.resolve(Amqp).close();
    await container.resolve(Mailer).close();
  });
});
