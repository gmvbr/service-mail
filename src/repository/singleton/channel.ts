import {singleton} from 'tsyringe';
import * as amqplib from 'amqplib';

@singleton()
class Channel {
  public conn?: amqplib.Connection;

  public async initialize() {
    this.conn = await amqplib.connect(process.env.AMQPLIB_URL!);
  }

  public async close() {
    return this.conn!.close();
  }
}

export default Channel;
