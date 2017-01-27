#!/usr/bin/env node
const cac = require('cac')
const getStdin = require('get-stdin')
const dotProp = require('dot-prop')

const cli = cac()

cli.command('*', 'Parse stdin', input => {
  const filter = input[0]
  let str
  if (input[1]) {
    str = input[1]
    handle(filter, str)
  } else {
    return getStdin().then(str => handle(filter, str))
  }
})

cli.onError(err => {
  console.log(err.stack)
  process.exit(1)
})

cli.parse()

function handle(filter, str) {
  const result = dotProp.get(JSON.parse(str), filter)
  console.log(result)
}
