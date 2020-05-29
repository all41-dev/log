import { Server } from "@all41-dev/server";
import { LogApi } from "./log-api";
import { LogDb } from "./log-db";
import { LogUi } from "./ui/index";
import { DbLogTransportInstance } from "./winston-db-transport";
import os from 'os';

const server = new Server({
  apis: {
    baseRoute: '/log/api/',
    type: LogApi,
  },
  dbs: {
    dbName: 'all41Log',
    engine: 'mariadb',
    type: LogDb,
    username: 'root',
    hostname: 'localhost',
    password: process.env.PASSWORD || 'PASSWORD not set',
  },
  uis: {
    baseRoute: '/log/',
    type: LogUi,
    config: {
      customMenu: [{
        label: 'TEST',
        uri: '/test/'
      },{
        label: 'GOOGLE',
        uri: 'https://www.google.com',
      }],
    }
  },
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
});
server.start(false, 8082);
// Server.logger.error(new Error('Test purpose error.'));