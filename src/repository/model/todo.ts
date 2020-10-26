import {Collection} from 'mongodb';
import {autoInjectable, singleton} from 'tsyringe';

import Database from '../singleton/database';

@singleton()
@autoInjectable()
class TodoModel {
  private database: Database;
  private collection: Collection;

  constructor(database?: Database) {
    this.database = database!;
    this.collection = database!.db!.collection('todo');
  }

  async insert(name: string, description: string) {
    return this.collection.insertOne({
      name,
      description,
    });
  }

  status() {
    return this.database.client!.isConnected();
  }
}

export default TodoModel;
