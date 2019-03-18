// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    count: 0,
    goods1: '',
    produce: '',
    product: '',
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id;
    this.setData({
      goods1: wx.getStorageSync('goods1'),
      id: id,
    })
    this.showProduct()
    this.initAdd();
  },
//  显示页面并更新数量
  showProduct() {
    let count=0;
    let product = wx.getStorageSync('goods1');
    let produce = []
    product.forEach((v, k) => {
      if (v.productId == this.data.id) {
        produce.push(v)
      }
    })
    if (produce[0].count){
      count = produce[0].count
    }
    this.setData({
      count:count,
      produce: produce,
    })
  },
  //  回到首页
  back() {
   wx.navigateBack({
   })
  },
  // 点击添加商品数
  addCar: function(e) {
    let id = e.currentTarget.dataset.id;
    let count = this.data.count;
    let goods = this.data.goods1;
    console.log(goods)
    // let index = e.currentTarget.dataset.index;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].productId == id) {
        if (!goods[i].count) {
          goods[i].count = 1
        } else {
          goods[i].count += 1
        }
        count = goods[i].count
      }
    }
    this.setData({
      count: count,
      goods1: goods
    })
    wx.setStorageSync('goods1', goods);
    this.initAdd();
  },
  // 点击减少商品
  reduce(e) {
    let count = this.data.count;
    let id = e.currentTarget.dataset.id;
    let goods = this.data.goods1
    // let index = e.currentTarget.dataset.index;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].productId == id) {
        if (goods[i].count == 0) {
          return;
        } else if (goods[i].count == 1) {
          goods[i].count = 0
        } else {
          goods[i].count -= 1
        }
        count = goods[i].count
      }
    }
    this.setData({
      count: count,
      goods1: goods
    })
    wx.setStorageSync('goods1', goods);
    this.initAdd();
  },
  // 计算好自己商品的值count
  initAdd: function () {
    var that = this;
    app.computed(that);
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
  //语言转换
  language() {
    let language = wx.getStorageSync('language');
    this.setData({
      language: language,
    })
  },

  changeCar() {
    this.showProduct()
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