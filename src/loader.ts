import 'reflect-metadata';
import {container} from 'tsyringe';

import Amqp from './repository/amqp';
import Mailer from './repository/mailer';
import Service from './service';
import Env from './env';

async function main() {
  await Env();

  const amqp = container.resolve(Amqp);
  await amqp.initialize();

  const mailer = container.resolve(Mailer);
  await mailer.initialize();

  const service = container.resolve(Service);
  await service.initialize(amqp, mailer);
}

export default main;
