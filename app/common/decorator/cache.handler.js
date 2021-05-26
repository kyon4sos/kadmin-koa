import { handlers } from '@/common/decorator'
const redis = require('@/db/cache')
export default class CacheHandler {
  constructor(target) {
    if (target) {
      this.proxy = new Proxy(target, {})
      handlers.forEach((i) => {
        let method = i.property
        if (i.decorator === 'CacheAble') {
          this.proxy[method] = async (arg) => {
            let key = generateKey(i, arg)
            let res = await redis.get(key)
            if (res) {
              return JSON.parse(res)
            }
            res = await target.constructor.prototype[method].call(target, arg)
            redis.set(key, JSON.stringify(res), 'EX', 300)
            return res
          }
        }
        if (i.decorator === 'CachePut') {
          this.proxy[method] = async (arg) => {
            let key = generateKey(i, arg)
            let res = await target.constructor.prototype[method].call(
              target,
              arg
            )
            redis.set(key, JSON.stringify(res), 'EX', 300)
            return res
          }
        }
        if (i.decorator === 'CacheEvict') {
          this.proxy[method] = async (arg) => {
            let key = generateKey(i, arg)
            redis.del(key)
            return await target.constructor.prototype[method].call(target, arg)
          }
        }
      })
    }
  }
}

function generateKey(obj, arg) {
  let {
    key: { prefix, value },
  } = obj
  if (prefix && value && arg instanceof Object && arg[value]) {
    return prefix + ':' + arg[value]
  }
  if (prefix && !(arg instanceof Object)) {
    return prefix + ':' + arg
  }
  if (!(arg instanceof Object)) {
    return obj.property + ':' + arg
  }
}
