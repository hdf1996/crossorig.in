const app = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = app.listen();

after(done => server.close(done));

module.exports = { app, server }
