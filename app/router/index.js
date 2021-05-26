const admin = require('./admin/index')
const login = require('./login')
const user = require('./user')
const test = require('./system')
// const { printAllroute } = require('@/util/log.js')
module.exports = function (app) {
  app.use(admin.routes())
  app.use(user.routes())
  app.use(login.routes())
}
