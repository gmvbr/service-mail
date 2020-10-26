import {Db, MongoClient} from 'mongodb';
import {singleton} from 'tsyringe';

@singleton()
class Database {
  public client?: MongoClient;
  public db?: Db;

  public async initialize() {
    this.client = await MongoClient.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.MONGO_USER!,
        password: process.env.MONGO_PASSWORD!,
      },
    });
    this.db = this.client.db(process.env.MONGO_DB!);
  }

  public async close() {
    return this.client!.close();
  }
}

export default Database;
