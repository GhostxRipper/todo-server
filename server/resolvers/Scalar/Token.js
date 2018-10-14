const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { verify } = require('jsonwebtoken')
const getConfig = require('../../../helpers/getConfig')

const coerceToken = value => {
  const { secret } = getConfig().jwt

  const token = String(value)
  try {
    verify(token, secret)
  } catch (error) {
    throw new Error('401: invalid token')
  }
  return token
}

module.exports = new GraphQLScalarType({
  name: 'Token',
  description: 'Token scalar type',
  parseValue: coerceToken,
  serialize: coerceToken,
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? ast.value : undefined
  },
})
