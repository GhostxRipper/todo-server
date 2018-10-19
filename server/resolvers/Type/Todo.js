const { parse } = JSON

module.exports = {
  complete({ complete }) {
    return parse(complete)
  },
}
