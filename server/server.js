module.exports = (function () {
  const listen = () => ( { close: done => done() } ) 
  return {listen}
})()
