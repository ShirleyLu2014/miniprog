// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var first={"_id":0,"tTitle":"店长推荐","id":"tab0"};
  var res=await db.collection('tabMenu').get();
  return [].concat(first,res.data);
}