const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const server = require('./server')
const colors = require('./helpers/colors')

const port = process.env.PORT || 8888

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    console.log(`with code: ${code} ${signal}`)
  })
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  server.listen(port, () => {
    console.log(
      `Server is running on ${colors.green(
        `http://127.0.0.1:${port}/graphql`,
      )}`,
    )
    console.log(`on worker ${colors.red(process.pid)}`)
  })
}
