const { fromBase64 } = require('../../../../helpers/base64')
const { getConnection } = require('../../../../helpers/db')

module.exports = async globalId => {
  const db = await getConnection()
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
