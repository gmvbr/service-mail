import 'reflect-metadata';

import {describe, it} from 'mocha';
import {container} from 'tsyringe';
import {createTestAccount} from 'nodemailer';

import Amqp from '../src/repository/amqp';
import Mailer from '../src/repository/mailer';
import Service from '../src/service';

import {Channel} from 'amqplib';

describe('test: Service', () => {
  let channel: Channel;
  before(async () => {
    const account = await createTestAccount();

    process.env.AMQP_URL = 'amqp://localhost:5672';
    process.env.AMQP_QUEUE = 'mail';
    process.env.TRANSPORT_HOST = account.smtp.host;
    process.env.TRANSPORT_PORT = `${account.smtp.port}`;
    process.env.TRANSPORT_SECURE = `${account.smtp.secure}`;
    process.env.TRANSPORT_AUTH_USER = account.user;
    process.env.TRANSPORT_AUTH_PASS = account.pass;

    await container.resolve(Amqp).initialize();
    await container.resolve(Mailer).initialize();

    channel = await container
      .resolve(Service)
      .initialize(container.resolve(Amqp), container.resolve(Mailer));
  });

  after(async () => {
    await container.resolve(Amqp).close();
    await container.resolve(Mailer).close();
  });

  it('expect empty body', async () => {
    channel.sendToQueue('mail', Buffer.from(JSON.stringify({}), 'utf8'));
  });

  it('expect error', async () => {
    channel.sendToQueue('mail', Buffer.from('error', 'utf8'));
  });

  it('expect send email', async () => {
    channel.sendToQueue(
      'mail',
      Buffer.from(
        JSON.stringify({
          from: 'Test <foo@example.com>',
          to: 'test@example.com',
          subject: 'Hello',
          text: 'Hello world',
        }),
        'utf8'
      )
    );
  });
});
