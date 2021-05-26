const Koa = require('koa')
const app = new Koa()
const koalogger = require('koa-logger')
const koaBody = require('koa-body')
const compress = require('koa-compress')
const errorHandler = require('./middleware/error')
require('@babel/register')
require('module-alias/register')

if (process.env.NODE_ENV !== 'production') {
  app.use(koalogger())
}
app.use(compress())
app.use(koaBody())
//权限中间件
require('@/middleware/auth')(app)
app.use(errorHandler)
app.on('error', (err,ctx) => {
});
// process.on('unhandledRejection', function(reason, promise) {
//   console.log(reason);
//   console.log(promise);
// });

//加载路由
require('./router')(app)

app.listen(3000)
