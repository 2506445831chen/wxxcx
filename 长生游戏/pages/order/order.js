const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data:{
    pricetotal:0,
   goods1:'',
   content:'',
   type:1,
},
  checkboxChange: function (e) {
    let type = e.currentTarget.dataset.id;
    if(this.data.type==type){
          this.setData({
            type:0
          })
    }else{
      this.setData({
        type: type
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.information();
  },
  information(){
    let pricetotal = wx.getStorageSync('pricetotal');
   let goods= wx.getStorageSync('goods1');
  let goods1=[]
    goods.forEach((v, k) => {
      if (v.count) {
        goods1.push(v)
      }
    });
    this.setData({
      goods1:goods1,
      pricetotal: pricetotal,
    })
    wx.setStorageSync('orderdata',goods1);
  },
  // 跳转到首页
  back(){
    wx.navigateBack({
      delta: 1,
    })
 
  },
  // 已经确认订单
  sureOrder(){
    wx.navigateTo({
      url: '/pages/payment/payment',
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
    this.setData({
      content: wx.getStorageSync('content')
    })
    this.language();
  },
  //语言转换
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