import 'reflect-metadata';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import {container} from 'tsyringe';

import Mailer from '../src/repository/mailer';
import {createTestAccount} from 'nodemailer';

describe('test: mailer', () => {
  const mailer = container.resolve(Mailer);

  it('expect: connection', async () => {
    const account = await createTestAccount();

    process.env.TRANSPORT_HOST = account.smtp.host;
    process.env.TRANSPORT_PORT = `${account.smtp.port}`;
    process.env.TRANSPORT_SECURE = `${account.smtp.secure}`;
    process.env.TRANSPORT_AUTH_USER = account.user;
    process.env.TRANSPORT_AUTH_PASS = account.pass;

    await mailer.initialize();

    expect(mailer.transporter).to.not.be.null;
    expect(mailer.transporter).to.not.be.undefined;

    await mailer.close();
  });
});
