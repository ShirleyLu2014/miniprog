// pages/index/index.js
const db = wx.cloud.database();
Page({

  
  //页面的初始数据
  data: {

  },
  // add() {
  //   db.collection("ingredients").add({
  //     data: {
  //       ingid: 14,
  //       ingName: "免费配料少",
  //       ingPrice:0
  //     },
  //     success: (res) => {
  //       console.log(res);
  //     },
  //     fail: (err) => {
  //       console.log(err);
  //     }
  //   })
  // },
  //单击点餐按钮，跳转至点餐主页面wx.navigateTo 跳转可返回
  order(options){
    wx.navigateTo({
      url: "../main/main",
    })
  },
  //生命周期函数--监听页面加载 
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