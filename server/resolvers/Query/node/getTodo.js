const { fromBase64 } = require('../../../../helpers/base64')
const { getConnection } = require('../../../../helpers/db')

module.exports = async globalId => {
  const db = await getConnection()
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
