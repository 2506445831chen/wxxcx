// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   success:'',
   order:'',
   foods:'/img/foods.png',
    pricetotal:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderdata()
  },
  getOrderdata(){
    let order= wx.getStorageSync('orderdata');
    let orderid=wx.getStorageSync('orderid');
    let pricetotal = wx.getStorageSync('pricetotal');
   this.setData({
     pricetotal: pricetotal,
     order:order,
     success: orderid
   })
  },
  navergator(){
   wx.navigateTo({
     url: '/pages/category/category',
    
   })
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
 this.language();
  },
  language() {
    let language = wx.getStorageSync('language');
    this.setData({
      language: language,
    })
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