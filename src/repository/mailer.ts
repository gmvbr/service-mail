import {singleton} from 'tsyringe';
import {createTransport, Transporter} from 'nodemailer';

@singleton()
class Mailer {
  public transporter?: Transporter;

  public async initialize() {
    this.transporter = createTransport({
      host: process.env.TRANSPORT_HOST,
      port: parseInt(process.env.TRANSPORT_PORT!),
      secure: process.env.TRANSPORT_SECURE === 'true',
      auth: {
        user: process.env.TRANSPORT_AUTH_USER,
        pass: process.env.TRANSPORT_AUTH_PASS,
      },
    });
  }

  public async close() {
    return this.transporter!.close();
  }
}

export default Mailer;
