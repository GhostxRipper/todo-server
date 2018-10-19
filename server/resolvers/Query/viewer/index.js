const { toBase64 } = require('../../../../helpers/base64')

module.exports = async (obj, args, { viewer }) => {
  if (!viewer) {
    throw new Error('403: token must be filled')
  }

  return {
    ...viewer,
    id: toBase64(`User:${viewer.id}`),
  }
}
