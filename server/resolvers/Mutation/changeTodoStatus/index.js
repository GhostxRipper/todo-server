const { fromBase64, toBase64 } = require('../../../../helpers/base64')
const getTodo = require('../../Query/node/getTodo')

module.exports = async (obj, { input }, { db, viewer }) => {
  const { id: base64Id, complete, clientMutationId } = input
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const [, id] = fromBase64(base64Id).split(':')

  const todo = await getTodo(base64Id)
  if (!todo) {
    throw new Error(`404: Entity \`Todo\` with id ${base64Id} not found`)
  }

  const todosIds = (await db.lrange(`todolist:${viewer.id}`, 0, -1)) || []
  if (!todosIds.find(v => v === id)) {
    throw new Error(`404: Entity \`Todo\` with id ${base64Id} not found`)
  }

  await db.hset(`todo:${id}`, 'complete', complete)

  return {
    todo: { ...todo, id: base64Id, complete },
    viewer: { ...viewer, id: toBase64(`User:${viewer.id}`) },
    clientMutationId,
  }
}
