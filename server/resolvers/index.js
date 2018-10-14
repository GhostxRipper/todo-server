const Node = require('./Interface/Node')
const Token = require('./Scalar/Token')

const login = require('./Mutation/login')
const register = require('./Mutation/register')
const addTodo = require('./Mutation/addTodo')

const viewer = require('./Query/viewer')
const node = require('./Query/node')
const todos = require('./Query/todos')

module.exports = {
  Node,
  Token,
  Mutation: {
    login,
    register,
    addTodo,
  },
  Query: {
    viewer,
    node,
    todos,
  },
}
