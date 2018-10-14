const Redis = require('ioredis')
const getConfig = require('./getConfig')

const { NODE_ENV } = process.env

let redis

const getConnection = async () => {
  if (redis) return redis

  const ENV = NODE_ENV || 'local'
  const config = getConfig().db

  // if not test or local retrieve from a secure location
  const { password } = ['local', 'test'].includes(ENV) ? config : {}

  redis = new Redis({
    port: config.port,
    host: config.host,
    password,
  })

  return redis
}

const kill = () => {
  if (redis) redis.quit()
}

module.exports = {
  getConnection,
  kill,
}
