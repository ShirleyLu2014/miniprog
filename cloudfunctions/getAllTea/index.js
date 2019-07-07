// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var menu=await db.collection("tabMenu").get();
  var tasks=[];
  var output=[
    [],    //店长推荐商品列表
    [],    //找好茶商品列表
    [],    //找奶茶商品列表
    [],    //找口感商品列表
    [],    //找拿铁商品列表
    []     //找新鲜商品列表
  ];
  tasks.push(db.collection("milkyTea").where({
    recommended:1
  }).get().then(res=>res.data));
  for(var m of menu.data){
    tasks.push(db.collection("milkyTea").where({
      tid:m["_id"]
    }).get().then(res => res.data));
  }
  output = await Promise.all(tasks);
  return output;
}