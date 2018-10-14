const { fromBase64, toBase64 } = require('../../../../helpers/base64')

const PREFIX = 'Todo_list.'

const offsetToCursor = offset => toBase64(PREFIX + offset)

const cursorToOffset = cursor =>
  parseInt(fromBase64(cursor).substring(PREFIX.length), 10)

const getOffsetWithDefault = (cursor, defaultOffset) => {
  if (typeof cursor !== 'string') {
    return defaultOffset
  }
  const offset = cursorToOffset(cursor)
  return Number.isNaN(offset) ? defaultOffset : offset
}

const getConnectionInfo = ({
  after, before, first, last,
}, length) => {
  const beforeOffset = getOffsetWithDefault(before, length)
  const afterOffset = getOffsetWithDefault(after, -1)

  let skip = Math.max(afterOffset, -1) + 1

  let limit = beforeOffset

  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('400: first < 0')
    }

    limit = Math.min(limit, skip + first)
  }

  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error('400: last < 0')
    }

    skip = Math.max(skip, limit - last)
  }

  const lowerBound = after ? afterOffset + 1 : 0
  const upperBound = before ? beforeOffset : length

  return {
    offset: Math.max(skip, 0),
    limit,
    hasPreviousPage: typeof last === 'number' && skip > lowerBound,
    hasNextPage: typeof first === 'number' && limit < upperBound,
  }
}

module.exports = {
  getConnectionInfo,
  offsetToCursor,
  cursorToOffset,
}
