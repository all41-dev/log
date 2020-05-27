import { Server } from "@all41-dev/server";
import { LogApi } from "./log-api";
import { LogDb } from "./log-db";

const server = new Server({
  apis: {
    baseRoute: '/',
    type: LogApi,
  },
  dbs: {
    dbName: 'all41Log',
    engine: 'mariadb',
    type: LogDb,
    username: 'root',
    hostname: 'localhost',
    password: process.env.PASSWORD || 'PASSWORD not set',
  }
});
server.start();