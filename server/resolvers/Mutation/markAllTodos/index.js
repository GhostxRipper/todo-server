const { toBase64 } = require('../../../../helpers/base64')

module.exports = async (obj, { input }, { db, viewer }) => {
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const { complete, clientMutationId } = input
  let ids = await db.lrange(`todolist:${viewer.id}`, 0, -1)
  ids = ids || []
  let todos = await Promise.all(ids.map(id => db.hgetall(`todo:${id}`)))
  todos = todos
    .map(
      (todo, i) =>
        Object.keys(todo).length > 0 && {
          ...todo,
          complete: todo.complete === 'true',
          id: ids[i],
        },
    )
    .filter(todo => Boolean(todo) && todo.complete !== complete)

  await Promise.all(
    todos.map(({ id }) => db.hset(`todo:${id}`, 'complete', complete)),
  )

  const changedTodos = todos.map(todo => ({
    ...todo,
    complete,
    id: toBase64(`User:${todo.id}`),
  }))

  return {
    clientMutationId,
    changedTodos,
    viewer: { ...viewer, id: toBase64(`User:${viewer.id}`) },
  }
}
