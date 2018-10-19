const { toBase64 } = require('../../../../helpers/base64')
const { offsetToCursor } = require('../../Query/todos/getConnectionFromList')

module.exports = async (
  obj,
  { input: { text, clientMutationId } },
  { db, viewer },
) => {
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const { id: userId, ...user } = viewer

  const id = await db.incr('next_todo_id')
  await db.hmset(`todo:${id}`, 'text', text, 'complete', false)
  await db.rpush(`todolist:${userId}`, id)
  let index = await db.llen(`todolist:${userId}`)
  index = parseInt(index, 10)
  index -= 1

  const node = {
    id: toBase64(`Todo:${id}`),
    text,
    complete: false,
  }

  return {
    todoEdge: {
      cursor: offsetToCursor(index),
      node,
    },
    viewer: {
      ...user,
      id: toBase64(`User:${userId}`),
    },
    clientMutationId,
  }
}
