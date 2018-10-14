const colors = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],
}

module.exports = Object.keys(colors).reduce((a, key) => {
  const color = colors[key]

  return {
    ...a,
    [key]: string => `\u001b[${color[0]}m${string}\u001b[${color[1]}m`,
  }
}, {})
