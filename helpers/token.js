const { verify, sign } = require('jsonwebtoken')
const getConfig = require('./getConfig')
const { getConnection } = require('./db')

const generate = ({ id }) => {
  const { secret, expiresIn } = getConfig().jwt
  return sign({ id }, secret, { expiresIn })
}

const decode = token => {
  const { secret, expiresIn } = getConfig().jwt

  return verify(token, secret, { maxAge: expiresIn })
}

const getUserIdFromToken = token => {
  let userId

  try {
    userId = decode(token).id
    userId = parseInt(userId, 10)
  } catch (error) {
    console.error(error)
  }
  if (!userId) {
    throw new Error('401: invalid token')
  }

  return userId
}

const getUserFromToken = async token => {
  const id = getUserIdFromToken(token)

  const db = await getConnection()
  const user = await db.hgetall(`user:${id}`)

  if (!Object.keys(user).length) {
    throw new Error('401: invalid token')
  }

  return { ...user, id }
}

module.exports = {
  generate,
  decode,
  getUserFromToken,
  getUserIdFromToken,
}
