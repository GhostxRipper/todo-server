const { fromBase64 } = require('../../../../helpers/base64')

module.exports = async (obj, { input }, { db, viewer }) => {
  const { id: base64Id, text, clientMutationId } = input
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const [, id] = fromBase64(base64Id).split(':')

  const todo = await db.hgetall(`todo:${id}`)
  if (!Object.keys(todo).length) {
    throw new Error(`404: Entity \`Todo\` with id ${base64Id} not found`)
  }

  const todosIds = (await db.lrange(`todolist:${viewer.id}`, 0, -1)) || []
  if (!todosIds.find(v => v === id)) {
    throw new Error(`404: Entity \`Todo\` with id ${base64Id} not found`)
  }

  await db.hset(`todo:${id}`, 'text', text)

  return {
    todo: { ...todo, id: base64Id, text },
    clientMutationId,
  }
}
