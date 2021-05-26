const Router = require('koa-router')
const route = new Router({
  prefix: '/user',
})
const { logger } = require('@/util/log')
import userService from '@/service/userService'

route.del('/:username', async (ctx) => {
  const { username } = ctx.params
  if (!username) {
    return (ctx.body = { code: 4000, msg: '用户名不能为空' })
  }
  ctx.body = await userService.delByUser(username)
})

route.allowedMethods()
module.exports = route
