// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //assets:[ {aname:xxx, price:xxx} , ... , ... , ... ],
    tabi:0,
    scrollHeight:0,
    toView:"",
    tabMenu:[],    //商品分类列表
    floor:[],
    windowHeight:0,
    milkyTea:[
      [],    //店长推荐商品列表
      [],    //找好茶商品列表
      [],    //找奶茶商品列表
      [],    //找口感商品列表
      [],    //找拿铁商品列表
      [],    //找新鲜商品列表
    ],
    cup:[
      {cid:1,cname:"大杯",cprice:4},
      { cid: 2, cname: "中杯", cprice: 0}
    ],
    ice:[
      {iid:1,iname:"少冰"},
      { iid: 2, iname: "去冰" },
      { iid: 3, iname: "常温" },
      { iid: 4, iname: "热饮" },
    ],
    sugar:[
      { sid: 1, sname: "正常糖" },
      { sid: 2, sname: "七分糖" },
      { sid: 3, sname: "五分糖" },
      { sid: 4, sname: "三分糖" },
      { sid: 5, sname: "不另外加糖" },
    ],
    assets:[
      {aid:1,aname:"珍珠",aprice:0},
      { aid: 2, aname: "波霸", aprice: 0 },
      { aid: 3, aname: "椰果", aprice: 0 },
      { aid: 4, aname: "仙草", aprice: 0 },
      { aid: 5, aname: "红豆", aprice: 0 },
      { aid: 6, aname: "燕麦", aprice: 1 },
      { aid: 7, aname: "布丁", aprice: 8 },
      { aid: 8, aname: "奶霜", aprice: 6 },
      { aid: 9, aname: "去糖改蜜", aprice: 6 },
      { aid: 10, aname: "黑糖奶霜", aprice: 10 },
      { aid: 11, aname: "去糖改黑糖", aprice: 4 },
      { aid: 12, aname: "咖啡冻", aprice: 4 },
      { aid: 13, aname: "冰激淋", aprice: 8},
      { aid: 13, aname: "免费配料多", aprice: 0 },
      { aid: 13, aname: "免费配料少", aprice: 0 }
    ],
    isShowBtn1:false,    //数量加减按钮
    showBox1:false,   //选购商品详情页默认不显示
    cid:1,   //默认杯型
    typeList:[] ,  //选型列表
    typeList1: [] ,  //选型列表
    typeList2: []  , //选型列表
    typeList3: []  , //选型列表
    /*cart:{
      "_id":{
        price:
        count:,
        ice:,
        sweet:,
        asset:[1,3,5,...]
      },
      "_id"
    }
    delete cart["_id"]*/
  },
  changeTabi(e){
    var toView=e.currentTarget.dataset.id;
    var tabi=e.currentTarget.dataset.tabi;
    this.setData({toView, tabi});
  },
  tolower(){
    this.setData({ toView: this.data.tabMenu[this.data.tabMenu.length - 1].id, tabi: this.data.tabMenu.length - 1})
  },
  scroll(e){
    var scrollTop=e.detail.scrollTop;
    for(var i=0; i<this.data.floor.length;i++){
      if(i<this.data.floor.length-1){
        if(scrollTop>=this.data.floor[i]&&scrollTop<this.data.floor[i+1]){
          this.setData({tabi:i})
          break;
        }
      }
    }
  },
  //点击添加按钮显示选择商品详情框
  showChooseBox(e) {
    this.showBox1 = true;
    this.setData({ showBox1: this.showBox1 });
  },
  closeChooseBox() {
    this.onClose();
  },
  onClose() {
    this.setData({ showBox1: false });
  },
  //杯型选择
  switchCup(e){
    var cid = e.currentTarget.dataset.cid,
      index = e.currentTarget.dataset.index,
      cname = e.currentTarget.dataset.cname;
    var typeList=[];
    typeList.push(cname)
    this.setData({
      cid: index,
      typeList: typeList
    })
    console.log(typeList);
    console.log(cname);
    console.log("*********"+this.data.typeList);
  },
  //冰度选择
  switchIce(e) {
    var iid = e.currentTarget.dataset.iid,
      index = e.currentTarget.dataset.index;
      var iname=e.currentTarget.dataset.iname;
    var typeList2=[];
    typeList2.push(iname);
    this.setData({
      iid: index,
      typeList2: typeList2
    })
  },
  //糖度选择
  switchSugar(e) {
    var sid = e.currentTarget.dataset.sid,
      index = e.currentTarget.dataset.index;
    this.setData({
      sid: index
    })
  },
  //配料选择
  switchAssets(e){
    var aid = e.currentTarget.dataset.aid,
      index = e.currentTarget.dataset.index;
    this.setData({
      aid: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({windowHeight: res.windowHeight,  scrollHeight: res.windowHeight - 140 });
      }
    });
    wx.cloud.callFunction({
      name:"getMenu",
      success: e=>{
        console.log("getMenu成功", e);
        this.setData({ tabMenu : e.result });
      },
      fail: e => console.log("失败", e) 
    });
    wx.cloud.callFunction({
      name: 'getAllTea',   //这个是云函数名
      success: e => {
        console.log("getAllTea成功", e)
        this.setData({ milkyTea:e.result });
        var floor=[0];
        var scrollTop=0;
        for(var i=1;i<this.data.tabMenu.length;i++){
          var length = this.data.milkyTea[i-1].length;
          scrollTop += length * 92 + 28;
          floor.push(scrollTop);
        }
        this.setData({floor});
      }, 
      fail: e => {
        console.log("失败", e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("===页面初次渲染完成===")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("===页面显示===")
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