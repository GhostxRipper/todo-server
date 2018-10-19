const { createServer } = require('http')
const { parse: parseURL } = require('url')
const getRawBody = require('raw-body')

const cors = require('../helpers/cors')
const colors = require('../helpers/colors')
const graphql = require('./graphql')

const { parse, stringify } = JSON

const app = cors(async (req, res) => {
  try {
    const { pathname } = parseURL(req.url)
    const { headers } = req
    if (pathname === '/graphql') {
      const body = parse(await getRawBody(req))

      const result = await graphql(body, headers)

      res.setHeader('Content-Type', 'application/json')
      res.end(stringify(result))
    } else {
      res.setHeader('Content-Type', 'text/plain')
      res.end('👾')
    }
  } catch (error) {
    console.error(error)

    let code = error.message.match(/\d{3}/)

    code = code && code[0]
    code = parseInt(code, 10)

    res.writeHead(code || 400, { 'Content-Type': 'text/plain' })
    res.end(code ? error.message : '400: Bad request')
  }
})

const server = createServer(app)

if (!module.parent) {
  const port = process.env.PORT || 8888
  server.listen(port, () => {
    console.log(
      `Server is running on ${colors.green(
        `http://127.0.0.1:${port}/graphql`,
      )}`,
    )
  })
}

module.exports = server
