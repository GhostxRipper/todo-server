const bcrypt = require('bcrypt')

const getConfig = require('../../../helpers/getConfig')
const { generate } = require('../../../helpers/token')
const { toBase64 } = require('../../../helpers/base64')

module.exports = async (obj, { input }, { db }) => {
  const {
    bcrypt: { salt },
  } = getConfig()
  const { username, password } = input
  const check = await db.hget('users', username)
  if (check) {
    throw new Error('409: user already exists')
  }

  const id = await db.incr('next_user_id')
  const hash = await bcrypt.hash(password, salt)
  await db.hmset(`user:${id}`, 'username', username, 'password', hash)
  await db.hset('users', username, id)

  return {
    viewer: { id: toBase64(`User:${id}`), username },
    token: generate({ id }),
  }
}
