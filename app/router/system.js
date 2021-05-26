const Router = require('koa-router')

const route = new Router()

route.get('/test', (ctx) => {
  ctx.body = 'test'
})

module.exports = route