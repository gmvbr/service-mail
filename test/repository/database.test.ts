import 'reflect-metadata';

import {describe, it} from 'mocha';

import {expect} from 'chai';
import {container} from 'tsyringe';
import Database from '../../src/repository/singleton/database';

describe('test database', () => {
  const database = container.resolve(Database);

  it('initialize', async () => {
    process.env.MONGO_URL = 'mongodb://localhost:27017';
    process.env.MONGO_USER = 'root';
    process.env.MONGO_PASSWORD = 'test';
    process.env.MONGO_DB = 'test';

    await database.initialize();
    expect(database.client).to.not.be.null;
    expect(database.db).to.not.be.null;
    await database.close();
  });
});
