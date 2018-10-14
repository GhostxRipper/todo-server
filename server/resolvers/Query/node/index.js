const { fromBase64 } = require('../../../../helpers/base64')
const getUser = require('./getUser')
const getTodo = require('./getTodo')

module.exports = (obj, { id }, { db }) => {
  const [type] = fromBase64(id).split(':')

  switch (type) {
    case 'User':
      return getUser(db, id)
    case 'Todo':
      return getTodo(db, id)
    default:
      return null
  }
}
