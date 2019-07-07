// pages/product/product.js
//初始化数据库
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    picList:[],
    img:[]
  },
  //  添加数据
  insert(){
    db.collection("milkyTea").add({
      data:{
        pid:1,
        title:"四季春茶",
        brief:"温和甘醇的四季春茶，带有栀子花香，香气高雅清扬，精选茶叶甘纯顺口、喉韵极佳、冷热皆宜!",          image:"https://7765-wechat01-gp5hv-1259439039.tcb.qcloud.la/bg/milkyTea/01.jpg?sign=9cb854dd4d42f3efb0e65082d6db65cb&t=1561982887",
        price:14,
        rawMaterial:"四季春茶"
      },
      success:(res)=>{
        console.log(res);
      },
      fail:(err)=>{
        console.log(err);
      }
    })
  },
  insert(){
    db.collection("milkyTea").add({
      data:{
        pid: 2,
        title: "阿萨姆红茶",
        brief: "阿萨姆茶是出产于印度东北部的阿萨姆邦的红茶。 阿萨姆位于东喜马拉雅山南麓，与不丹相邻。", 
        image: "https://7765-wechat01-gp5hv-1259439039.tcb.qcloud.la/bg/milkyTea/02.jpg?sign=8e96f105ec52e40e413a3c4bd69e837e&t=1561983601",
        price: 14,
        rawMaterial: "红茶"
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  update(){
    db.collection("milkyTea").doc("2f54b0685d19fae8045cd25076cd6033").update({
      data:{
        pid: 3,
        title: "冻顶乌龙茶",
        brief: "冻顶乌龙茶，产地为台湾鹿谷乡凤凰村 永隆村彰雅村(冻顶巷)，茶区海拔约600-1000公尺，依以上三点为核心产区，被誉为“茶中圣品”。冻顶乌龙茶汤清爽怡人，汤色蜜绿带金黄，茶香清新典雅，香气清雅 ，喉韵回甘浓郁且持久，香气独特据说是帝王级泡澡茶浴的佳品。台湾鹿谷附近冻顶山，山多雾，路陡滑，上山采茶都要将脚尖“冻”起来，避免滑下去，山顶叫冻顶、山脚叫冻脚。所以冻顶茶产量有限，尤为珍贵。",
        image: "https://7765-wechat01-gp5hv-1259439039.tcb.qcloud.la/bg/milkyTea/03.jpg?sign=081732f74b534d340a71b7939ec1b671&t=1561984019",
        price: 14,
        rawMaterial: "乌龙茶"
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  //查询所有数据
  /*select(){
    db.collection("milkyTea").get().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },*/
  //按条件查询
  select(){
    db.collection("milkyTea").get().then(res=>{
      this.data=res.data;
      //赋值
      this.setData({
        data: this.data
      })
      console.log(this.data);
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },
  del(e){
    var _id=e.target.dataset.id;
    db.collection("milkyTea").doc(_id).remove().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  },
  //调用云函数
  add(){
    wx.cloud.callFunction(
      {
        name:"sum",
        data:{
          i:9,
          j:10
        }
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
  },
  getOpenid(){
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      console.log(res);
      console.log(res.result.openid);
    }).catch(err=>{
      console.log(err);
    })
  },
  delData(){
    wx.cloud.callFunction({
      name:"delData"
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
  },
  upload(){
    //微信选择图片方法
    wx.chooseImage({
      count:1,   //一次选择几张图片
      sizeType:["original","compressed"],    //选择图片原图/压缩
      sourceType:["album","camera"],         //图片来源
      success: function (res) {       //回调函数
        var list = res.tempFilePaths[0];
        //res.tempFilePaths[0]         //选中图片，这是一个数组
       // console.log(list);
        //上传图片
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ".jpg",    //新文件路径
          filePath: list,        //准备上传文件路径
          success: res => {
            console.log(res);
          }
        })
      } ,        
    })
  },
  getImage(){

  },
  //上传图片，并将图片id保存进集合
  myupload(){
    wx.chooseImage({
      count:1,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success: function(res) {
        var pic=res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+".jpg",
          filePath:pic,
          success:res=>{
            var fileID = res.fileID;
            db.collection("milkPhoto").add({
              data:{
                fileID
              }
            }).then(res=>{
              //console.log(res);
            }).catch(err=>{
              console.log(err);
            })
          }
        })
      },
    })
  },
  //展示图片
  showPic(){
    //1.查询云数据库集合 milkPhoto
    db.collection("milkPhoto").get().then(res=>{
      //console.log(res);
      this.picList=res.data;
      console.log(this.picList);
      this.setData({
        picList: this.picList
      })
    }).catch(err=>{
      console.log(err);
    })
    //2.获取数组保存
  },
  imgg(){
    db.collection("milkyTea").where({
      title:"可可芭蕾"
    }).get().then(res=>{
      this.img = res.data[0];
      console.log(res.data[0]);
      //赋值
      this.setData({
        img: this.img
      })
      console.log(1);
      console.log(this.img);
    }).catch(err=>{
      console.log(err);
    })
  },
      // del(){
  //   db.collection("milkyTea").doc("")
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})