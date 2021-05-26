
const CustomError = require('../common/customError.js')
const {logger } = require('../util/log.js')
const errorHandler =async (ctx, next) => {
  try {
   await next()
  }catch(e) {
    if(e instanceof CustomError ) {
      ctx.body = {
        msg:e.msg,
        code:e.code
      }
    }else {
      logger.error({message:e.message})
      ctx.body = {
        msg:'系统异常稍后再试'
      }
    }
    
  }
}

module.exports = errorHandler
