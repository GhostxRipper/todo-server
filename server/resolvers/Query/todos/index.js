const { toBase64 } = require('../../../../helpers/base64')
const getTodo = require('../node/getTodo')
const { getConnectionInfo, offsetToCursor } = require('./getConnectionFromList')

module.exports = async (obj, args, { db, viewer }) => {
  if (!viewer) {
    throw new Error('403: token must be filled')
  }
  const { id } = viewer

  let length = await db.llen(`todolist:${id}`)
  length = parseInt(length, 10)

  const {
    offset, limit, hasNextPage, hasPreviousPage,
  } = getConnectionInfo(
    args,
    length,
  )

  const ids = (await db.lrange(`todolist:${id}`, offset, limit - 1)) || []
  let edges = await Promise.all(
    ids.map(todoId => getTodo(db, toBase64(`Todo:${todoId}`))),
  )
  edges = edges.filter(Boolean)
  edges = edges.map((node, index) => ({
    cursor: offsetToCursor(index + offset),
    node,
  }))

  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]

  return {
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasNextPage,
      hasPreviousPage,
    },
    edges,
  }
}
