export const handlers = []
export const CacheAble = (key) => {
  return (target, property, descriptor) => {
    handlers.push({target, property, descriptor,decorator:'CacheAble',key})
  }
}

export const CachePut = (key) => {
  return (target, property, descriptor) => {
    handlers.push({target, property, descriptor,decorator:'CachePut',key})
  }
}
export const CacheEvict = (key) =>{
  return (target, property, descriptor) => {
    handlers.push({target, property, descriptor,decorator:'CacheEvict',key})
  }
}