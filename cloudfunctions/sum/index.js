// 云函数入口文件
/*const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/
//event用户传递的参数
//content当前用户信息
//async 异步，当前函数异步执行
exports.main=async(event,content)=>{
  return {
    sum:event.i+event.j
  }
}
