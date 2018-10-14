const { fromBase64 } = require('../../../../helpers/base64')

module.exports = async (db, globalId) => {
  let [, id] = fromBase64(globalId).split(':')
  id = parseInt(id, 10)

  if (!id) return null

  const user = await db.hgetall(`user:${id}`)

  if (!Object.keys(user).length) return null

  return {
    ...user,
    id: globalId,
  }
}
