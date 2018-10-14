const { fromBase64 } = require('../../../helpers/base64')

module.exports = {
  __resolveType({ id }) {
    const [type] = fromBase64(id).split(':')
    return type
  },
}
