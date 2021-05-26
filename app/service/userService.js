const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('@/model/user')
const CustomError = require('@/common/customError')
import cacheHandler from '@/common/decorator/cache.handler'
import { CacheAble, CachePut, CacheEvict } from '@/common/decorator'
const jwtConfig = require('@/config/jwt.config')
const { logger } = require('@/util/log')
const saltRounds = 10

class UserService {
  @CachePut({ prefix: 'user', value: 'username' })
  async createUser(userModel) {
    let { username, password } = userModel
    let user = await this.findByUsername(username)
    if (user) {
      throw new CustomError('用户已经存在', 4000)
    }
    try {
      const salt = bcrypt.genSaltSync(saltRounds)
      password = bcrypt.hashSync(password, salt)
      user = await UserModel.create({ username, password, salt })
      const token = jwt.sign(
        { sub: username, iat: Math.floor(Date.now() / 1000) },
        jwtConfig.key
      )
      return { token: token, code: 2000, msg: '注册成功' }
    } catch (err) {
      logger.error({ message: err })
      return new CustomError(err)
    }
  }
  @CacheAble({ prefix: 'user', value: 'username' })
  async findByUsername(username) {
    let res = await UserModel.findOne({ where: { username: username } })
    return res
  }
  async login(username, password) {
    let user = await this.findByUsername(username)
    if (!user) {
      throw new CustomError('用户名或密码错误', 4000)
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new CustomError('用户名或密码错误', 4000)
    }
    try {
      const token = jwt.sign(
        { sub: username, iat: Math.floor(Date.now() / 1000) },
        jwtConfig.key
      )
      return { msg: 'ok', code: 2000, token }
    } catch (e) {
      throw new CustomError('jwt 异常', 5000)
    }
  }
  @CacheEvict({ prefix: 'user', key: 'username' })
  async delByUser(username) {
    let res = await UserModel.destroy({ where: { username } })
    return { msg: 'ok', code: 2000, data: res }
  }
}
const user = new UserService()
new cacheHandler(user)
export default user
