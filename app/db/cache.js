const Redis = require('ioredis')
const { logger } = require('@/util/log')
const redis = new Redis({ password: 123456, port: 6380 })
redis.on('end', function (err) {})
redis.on('error', function (err) {
  console.error('redis error', err)
  logger.error({
    message: err,
  })
  process.exit(1)
})
redis.on('connect', function () {
  console.error('redis connect')
})
module.exports = redis
