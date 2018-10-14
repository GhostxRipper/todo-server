const cors = next => (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', '*')

  if (request.method === 'OPTIONS') {
    response.end()
  } else {
    next(request, response)
  }
}

module.exports = cors
