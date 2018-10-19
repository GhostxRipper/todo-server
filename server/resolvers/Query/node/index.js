const { fromBase64 } = require('../../../../helpers/base64')
const getUser = require('./getUser')
const getTodo = require('./getTodo')

module.exports = (obj, { id }, { viewer }) => {
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const [type] = fromBase64(id).split(':')

  switch (type) {
    case 'User':
      return getUser(id)
    case 'Todo':
      return getTodo(id)
    default:
      return null
  }
}
