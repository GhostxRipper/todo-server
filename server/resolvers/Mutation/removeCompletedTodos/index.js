const { toBase64 } = require('../../../../helpers/base64')

const { parse } = JSON

module.exports = async (obj, { input }, { db, viewer }) => {
  const { clientMutationId } = input
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const ids = await db.lrange(`todolist:${viewer.id}`, 0, -1)

  let todos = await Promise.all(ids.map(id => db.hgetall(`todo:${id}`)))
  todos = todos.map((todo, i) => ({
    ...todo,
    complete: parse(todo.complete),
    id: parse(ids[i]),
  }))

  const deletedTodoIds = todos.filter(todo => todo.complete).map(({ id }) => id)

  await db.del(deletedTodoIds.map(id => `Todo:${id}`))

  const todolist = todos.filter(todo => !todo.complete).map(({ id }) => id)
  todolist.reverse()
  await db.del(`todolist:${viewer.id}`)
  await Promise.all(todolist.map(id => db.lpush(`todolist:${viewer.id}`, id)))

  return {
    deletedTodoIds: deletedTodoIds.map(id => toBase64(`Todo:${id}`)),
    viewer: { ...viewer, id: toBase64(`User:${viewer.id}`) },
    clientMutationId,
  }
}
