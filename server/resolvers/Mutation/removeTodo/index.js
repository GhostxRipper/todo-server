const { fromBase64, toBase64 } = require('../../../../helpers/base64')

module.exports = async (obj, { input }, { db, viewer }) => {
  const { clientMutationId, id: base64Id } = input
  if (!viewer) {
    throw new Error('403: token must be filled')
  }

  const [, id] = fromBase64(base64Id).split(':')
  const isRemoved = await db.lrem(`todolist:${viewer.id}`, 1, id)

  if (!isRemoved) {
    throw new Error(`404: Entity \`Todo\` with id ${base64Id} not found`)
  }

  await db.del(`todo:${id}`)

  return {
    deletedTodoId: base64Id,
    viewer: { ...viewer, id: toBase64(`User:${viewer.id}`) },
    clientMutationId,
  }
}
