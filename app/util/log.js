const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, prettyPrint, colorize, printf } = format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})
const logger = createLogger({
  defaultMeta: { service: 'koa-admin' },
  transports: [
    new transports.Console({
      format: combine(
        label({ label: 'dev' }),
        timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        colorize(),
        myFormat
      ),
    }),
    new transports.File({
      level: 'error',
      filename:'error.log',
      format: combine(timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),format.json()),
    }),
  ],
})
const printPath = (router) => {
  let layers = router.stack
  if (layers instanceof Array) {
    layers.forEach((i) => {
      logger.info({
        level: 'info',
        message: i.path,
      })
    })
  }
}
const printAllroute = (routers) => {
  if (routers instanceof Array) {
    routers.forEach((r) => {
      printPath(r)
    })
  }
}


module.exports = {
  printAllroute,
  logger
}
