const { getUserFromToken } = require('../../../../helpers/token')

module.exports = async (obj, { input }, { db, token }) => {
  const { id, complete, clientMutationId } = input
  if (!token) {
    throw new Error('403: token must be filled')
  }

  const todo = await db.hgetall(`todo:${id}`)
  if (!Object.keys(todo).length) {
    throw new Error(`404: Entity \`Todo\` with id ${id} not found`)
  }

  const user = await getUserFromToken(token)

  const todosIds = (await db.lrange(`todolist:${user.id}`, 0, -1)) || []
  if (!todosIds.find(v => v === id)) {
    throw new Error('403: You cannot access to this `Todo`')
  }

  await db.hset(`todo:${id}`, 'complete', complete)

  return { todo: { ...todo, id, complete }, viewer: user, clientMutationId }
}
