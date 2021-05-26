const jwt = require('koa-jwt')
const jwtConfig = require('@/config/jwt.config')
module.exports = (app) => {
  app.use(function (ctx, next) {
    return next().catch((err) => {
      if (401 == err.status) {
        ctx.status = 401
        ctx.body = { message: '请登录', code: 4000 }
      } else {
        throw err
      }
    })
  })
  //放行url
  app.use(
    jwt({
      secret: jwtConfig.key,
    }).unless({
      path: [/^\/public/, /^\/login/, /^\/register/, /^\/admin\/update/, '/'],
    })
  )
  //受保护的url
  // app.use(function (ctx) {
  //   if (ctx.url.match(/^\/api/)) {
  //     ctx.body = 'protected\n'
  //   }
  // })
}
