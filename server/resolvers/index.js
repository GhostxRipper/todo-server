const Node = require('./Interface/Node')
const Token = require('./Scalar/Token')

const login = require('./Mutation/login')
const register = require('./Mutation/register')

const viewer = require('./Query/viewer')
const node = require('./Query/node')
const todos = require('./Query/todos')

module.exports = {
  Node,
  Token,
  Mutation: {
    login,
    register,
  },
  Query: {
    viewer,
    node,
    todos,
  },
}
