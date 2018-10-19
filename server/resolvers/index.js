const Node = require('./Interface/Node')
const Token = require('./Scalar/Token')

const login = require('./Mutation/login')
const register = require('./Mutation/register')
const addTodo = require('./Mutation/addTodo')
const changeTodoStatus = require('./Mutation/changeTodoStatus')
const markAllTodos = require('./Mutation/markAllTodos')
const removeCompletedTodos = require('./Mutation/removeCompletedTodos')

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
    changeTodoStatus,
    markAllTodos,
    removeCompletedTodos,
  },
  Query: {
    viewer,
    node,
    todos,
  },
}
