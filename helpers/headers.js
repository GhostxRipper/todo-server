const getAuthorization = ({ Authorization, authorization }) =>
  Authorization || authorization || ''

module.exports = {
  getAuthorization,
}
