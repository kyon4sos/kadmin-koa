const Router = require('koa-router')
const route = new Router()
const { logger } = require('@/util/log')
import userService from '@/service/userService'

//登录
route.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return (ctx.body = { code: 4000, msg: '用户名或者密码不能为空' })
  }
  ctx.body = await userService.login(username, password)
})
//注册
route.post('/register', async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return (ctx.body = { code: 4000, msg: '用户名或者密码不能为空' })
  }
  ctx.body = await userService.createUser({ username, password })
})

route.allowedMethods()
module.exports = route
