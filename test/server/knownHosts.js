const chai = require("chai");
const request = require("request-promise");

const should = chai.should();
const expect = chai.expect;
const knownHosts = require("../fixtures/knownHosts");

describe("Every known host", () => {
  Object.keys(knownHosts).forEach(host => {
    const statusCode = knownHosts[host];
    context(`with ${host}`, () => {
      it(`returns ${statusCode}`, done => {
        request({
          uri: `http://localhost:5000/${host}`,
          resolveWithFullResponse: true
        }).then(res => {
          res.should.have.property("statusCode", statusCode);
          done();
        });
      });
    });
  });
});
