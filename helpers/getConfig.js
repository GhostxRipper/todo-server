const env = require('../env.json')

const { NODE_ENV } = process.env

let config

module.exports = () => {
  if (config) return config

  const ENV = NODE_ENV || 'local'

  config = env[ENV]

  if (!config) {
    throw new Error('500: no config file found for current env')
  }

  return config
}
