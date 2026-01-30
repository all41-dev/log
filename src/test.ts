import { Server } from "@all41-dev/server";
// import { LogApi } from "./log-api";
import { LogDb } from "./log-db";
import { DbLogTransportInstance } from "./winston-db-transport";
import os from 'os';

const server = new Server({
  statics: {
    baseRoute: '/assets',
    ressourcePath: `${__dirname}/assets`,
    requireAuth: false,
  },
  loggerOptions: {
    level: 'info',
    // defaultMeta: ['test', 'all41ServerApp', `${os.hostname}Host`],
    defaultMeta: {
      hostname: os.hostname,
      application: 'logger',
      customer: 'test application',
    },
    transports: new DbLogTransportInstance({
      db: {
        dbName: 'all41Log',
        engine: 'mariadb',
        username: 'root',
        password: process.env.PASSWORD || 'PASSWORD not set',
        hostname: 'localhost',
        type: LogDb,
      },
      level: 'debug',
    })
  },
  httpPort: 8082,
});
server.start();
// Server.logger.error(new Error('Test purpose error.'));
