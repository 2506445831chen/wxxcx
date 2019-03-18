// pages/search/search.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    goods1: '',
    show: '',
    input: '',
    goods2: null,
    pricetotal:0,
    close: 'display:none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.changeCar();
  },
  // 计算好自己商品的值count
  initAdd: function () {
    var that = this;
    app.computed(that);
  },
  // 点击获取需要页面
  clickcategory(e) {
    this.setData({
      goods2: [],
      show: e.currentTarget.dataset.index,
    })
  },
  // 点击显示所有商品内容
  searchAll() {
    this.setData({
      show:'',
    })
    this.initcategory();
  },
  // 搜索的值
  bindinput(e) {
    let intput = e.detail.value;
    this.setData({
      input: intput,
      close: 'display:block',
    })
  },
  // 清空输入内容
  clearWord() {
    this.setData({
      input: '',
      close: 'display:none',
    })
  },
  // 获取输入值并进行展示页面
  initcategory() {
    console.log(this.data.input)
    app.init({
      url: 'queryByNameSellerId',
      data: {
        sellerId: wx.getStorageSync('sellerid'),
        name: this.data.input
      },
      success: (result) => {
        var data = app.errAlert(result)
        let goods1 = data
        this.setData({
          goods2: goods1,
        })
        if (goods1.length==0) {
          this.setData({
            show: 1,
          })
        }
      }
    })
  },
// 底部返回值
  changeCar() {
    this.setData({
      goods1: wx.getStorageSync('goods1')
    })
    this.initAdd();
  },
// 去到详情页
  order() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  navergator() {
   wx.navigateBack({
   
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})