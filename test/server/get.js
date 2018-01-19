const chai = require('chai');

const should = chai.should();
const expect = chai.expect;

describe('GET Method', () => {
  describe('/http://url.com', () => {
    context('with headers on the request', () => {
      it('The server receives the same headers', done => done())
      it('The server receives the same query params', done => done())
      it('The client receives the headers that the server sent', done => done())
      it('The client receives the body that the server sent', done => done())
      it('The client receives the patched CORS header', done => done())
    })

    context('with special headers on the request', () => {
      it('The server receives just the permitted headers', done => done())
      it('The server receives the same query params', done => done())
      it('The client receives the headers that the server sent', done => done())
      it('The client receives the body that the server sent', done => done())
      it('The client receives the patched CORS header', done => done())
    })
  })
  //
  // describe('/https://url.com', () => {
  //   context('with headers on the request', () => {
  //     it('The server receives the same headers', done => done())
  //     it('The server receives the same query params', done => done())
  //     it('The client receives the headers that the server sent', done => done())
  //     it('The client receives the body that the server sent', done => done())
  //     it('The client receives the patched CORS header', done => done())
  //   })
  //
  //   context('with special headers on the request', () => {
  //     it('The server receives just the permitted headers', done => done())
  //     it('The server receives the same query params', done => done())
  //     it('The client receives the headers that the server sent', done => done())
  //     it('The client receives the body that the server sent', done => done())
  //     it('The client receives the patched CORS header', done => done())
  //   })
  // })

  describe('/https//url.com', () => {
    it('Returns 400', done => done())
    it('Returns 400', done => done())
  })
})
