const { getUserFromToken } = require('../../../../helpers/token')
const { toBase64 } = require('../../../../helpers/base64')

module.exports = async (obj, args, { token }) => {
  if (!token) {
    throw new Error('403: token must be filled')
  }
  const user = await getUserFromToken(token)

  return {
    ...user,
    id: toBase64(`User:${user.id}`),
  }
}
