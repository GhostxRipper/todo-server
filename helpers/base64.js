module.exports = {
  toBase64: str =>
    Buffer.from(str)
      .toString('base64')
      .replace(/=/g, ''),
  fromBase64: str => Buffer.from(str, 'base64').toString('utf8'),
}
