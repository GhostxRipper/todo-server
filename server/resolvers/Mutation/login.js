const bcrypt = require('bcrypt')

const { generate } = require('../../../helpers/token')
const { toBase64 } = require('../../../helpers/base64')

module.exports = async (obj, { input }, { db }) => {
  const { username, password } = input

  const userId = await db.hget('users', username)
  const id = parseInt(userId, 10)
  if (!id) {
    throw new Error('403: wrong password or username')
  }

  const user = await db.hgetall(`user:${id}`)
  const success = await bcrypt.compare(password, user.password)
  if (!success) {
    throw new Error('403: wrong password or username')
  }

  return {
    viewer: { id: toBase64(`User:${id}`), username },
    token: generate({ id }),
  }
}
