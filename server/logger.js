const { NODE_ENV } = process.env;

const info = msg => NODE_ENV !== 'test' && console.log(msg)
const error = msg => NODE_ENV !== 'test' && console.log(msg)

module.exports = { info, error }
