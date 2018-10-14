const { graphql } = require('graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const { kill, getConnection } = require('../helpers/db')
const colors = require('../helpers/colors')
const { getAuthorization } = require('../helpers/headers')

const { parse } = JSON

const typeDefs = readFileSync(join(__dirname, '../schema.graphql'), 'utf8')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = async ({ query, variables }, headers = {}) => {
  const db = await getConnection()
  const token = getAuthorization(headers).replace(/Bearer /, '')
  const context = {
    headers,
    db,
    token,
  }

  // eslint-disable-next-line no-nested-ternary, no-param-reassign
  variables = typeof variables === 'object'
    ? variables
    : typeof variables === 'string'
      ? parse(variables)
      : {}

  return graphql(schema, query, null, context, variables, null)
}

process.on('exit', kill)
process.on('unhandledRejection', error => {
  console.error(colors.red('on unhandledRejection:'), error)
})
process.on('error', error => {
  console.error(colors.red('on error:'), error)
})
