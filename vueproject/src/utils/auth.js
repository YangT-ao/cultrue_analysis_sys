import Cookies from 'js-cookie'

const tokenKey = "UserToken"

/**
 * 从cookies从获取token
 * @returns {*}
 */
export const getToken = ()=>{
  return Cookies.get(tokenKey)
}

/**
 * 将token添加到cookies中
 * @param token
 * @returns {*}
 */
export const setToken = (token)=>{
  return Cookies.set(tokenKey, token, {expires: 7}) // 有效期为7天
}

/**
 * 从cookies中删除token
 * @returns {*}
 */
export const removeToken = ()=>{
  return Cookies.remove(tokenKey)
}

/**
 * 移除localStorage中的属性
 */
export const removeLocalStorageUser = ()=>{
  return localStorage.removeItem("user")
}

/**
 * 解析localStorage的内容成对象
 * @param key
 * @returns {any}
 */
export const parseLocalStorageItem = (key)=>{
  return JSON.parse(localStorage.getItem(key))
}

/**
 * 插入属性到localStorage中
 * @param key
 * @param value
 */
export const setLocalStorageItem = (key,value)=>{
  return localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 判断用户是否已登录
 * @returns {*}
 */
export const hasLogin = ()=>{
  return getToken()
}

/**
 * 判断当前用户是否是管理员
 * @returns {*}
 */
export const isCurrentAdmin = ()=>{
  const user = parseLocalStorageItem("user")
  if (user) {
    return user.isAdmin
  }
}
