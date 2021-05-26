const Router = require('koa-router')

import userService from '@/service/userService'
const route = new Router({
  prefix: '/admin',
})

route.get('/', async (ctx) => {
  const { username } = ctx.query
  ctx.body = await userService.findByUsername(username)
})
route.get('/update', (ctx) => {
  ctx.body = 'hello world admin'
})
route.allowedMethods()
module.exports = route
