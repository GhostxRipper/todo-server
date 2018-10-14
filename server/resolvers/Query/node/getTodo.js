const { fromBase64 } = require('../../../../helpers/base64')

module.exports = async (db, globalId) => {
  let [, id] = fromBase64(globalId).split(':')
  id = parseInt(id, 10)

  if (!id) return null

  const todo = await db.hgetall(`todo:${id}`)

  if (!Object.keys(todo).length) return null

  return {
    ...todo,
    id: globalId,
  }
}
