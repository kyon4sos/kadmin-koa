const {logger} = require('@/util/log')

const debug = (ctx, next) => {
  const { url, method } = ctx.request
  logger.info({
    message:`${method} ${url}`
  })
  next()
}

module.exports = debug
