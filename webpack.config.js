/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error", "windows"] */

const isDev = process.env.NODE_ENV === 'development'
const { _default } = require('./config/default.config')

module.exports = _default(isDev, process.env)
