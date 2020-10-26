import {singleton} from 'tsyringe';
import * as amqplib from 'amqplib';

@singleton()
class Amqp {
  public connection?: amqplib.Connection;

  public async initialize() {
    this.connection = await amqplib.connect(process.env.AMQP_URL!);
  }

  public async close() {
    return this.connection!.close();
  }
}

export default Amqp;
