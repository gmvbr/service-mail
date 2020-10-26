import {singleton} from 'tsyringe';
import Ajv, {ValidateFunction} from 'ajv';

import Amqp from '../repository/amqp';
import Mailer from '../repository/mailer';

@singleton()
class Service {
  private validate?: ValidateFunction;

  constructor() {
    this.validate = new Ajv().compile({
      type: 'object',
      properties: {
        from: {
          type: 'string',
        },
        to: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        html: {
          type: 'string',
        },
      },
      required: ['from', 'to', 'subject'],
    });
  }

  public async initialize(amqp: Amqp, mailer: Mailer) {
    const channel = await amqp.connection!.createChannel();
    await channel.assertQueue(process.env.AMQP_QUEUE!, {
      durable: false,
    });
    await channel!.consume(process.env.AMQP_QUEUE!, message => {
      try {
        /* istanbul ignore if */
        if (message === null) {
          return; // reject
        }
        channel!.ack(message);
        const body = JSON.parse(message.content.toString('utf-8'));
        if (!this.validate!(body)) {
          return; // reject
        }
        mailer!.transporter!.sendMail(body, err => {
          /* istanbul ignore if */
          if (err) {
            console.error(err);
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
    return channel;
  }
}

export default Service;
