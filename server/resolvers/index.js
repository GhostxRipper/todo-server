const Node = require('./Interface/Node')
const Token = require('./Scalar/Token')

const login = require('./Mutation/login')
const register = require('./Mutation/register')
const addTodo = require('./Mutation/addTodo')
const changeTodoStatus = require('./Mutation/changeTodoStatus')
const markAllTodos = require('./Mutation/markAllTodos')
const removeCompletedTodos = require('./Mutation/removeCompletedTodos')
const removeTodo = require('./Mutation/removeTodo')
const renameTodo = require('./Mutation/renameTodo')

const viewer = require('./Query/viewer')
const node = require('./Query/node')
const todos = require('./Query/todos')

const Todo = require('./Type/Todo')

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
    removeTodo,
    renameTodo,
  },
  Query: {
    viewer,
    node,
    todos,
  },
  Todo,
}
