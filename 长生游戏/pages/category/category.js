const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    sellerId:'',
    pricetotal: 0,
    num: 0,
    goods: [],
    goods1: '',
    toView: 'b',
    count: '',
    pricture: '',
    sign: 0,
    language:'',
    success:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   var data= app.getSellerId(options);
  //  sellerid 的获取
   this.setData({
     sellerId:data
   })
    wx.setStorageSync('sellerid', data)
    // 商品类目的展示
    this.allCategory();
    this.initcategory();
    // 判断商家是否在线
    this.upLine();
    // 进行登陆 code码的获取以及用户的授权
    app.onLoading()
  },
upLine(){
 app.init({
   url: 'checkLogin',
   data: {
     sellerId: this.data.sellerId
   },
   success:(res)=>{
     var goods = app.errAlert(res);
     wx.setStorageSync('unline', goods)
     if(goods=='false'){
       wx.showToast({
         title: '后台已下线',
         icon:'none'
       })
     }else{
    
     }
   }
 })
},

  // 给出分类
  allCategory() {
    app.init({
      url: 'showAllCategoryBySellerId',
      data: {
        sellerId:this.data.sellerId
      },
      success: (result) => {
        var goods =  app.errAlert(result)
        var goods1 = [];
        goods.forEach((v, k) => {
          goods1[v.categoryType] = v
        })
        this.setData({
          goods: goods,
          sign:goods[0].categoryId
        })
        wx.setStorageSync('goods', goods)
      }
    })
  },
  // 数据整理
  onShow: function () {
   this.language();
    this.setData({
      goods1: wx.getStorageSync('goods1')
    })
   this.initAdd();
  },
  language(){
    let success=wx.getStorageSync('success');
   let language=wx.getStorageSync('language');
   this.setData({
     language:language,
     success:success,
   })
  },
  // 获取右侧商品信息
  initcategory() {
    app.init({
      url: 'showAllProductBySellerId',
      data: {
        sellerId: this.data.sellerId
      },
      success: (result) => {
        let goods =  app.errAlert(result);
          this.setData({
            goods1:goods,
          });
        wx.setStorageSync('goods1', this.data.goods1);
        wx.setStorageSync('clear', goods);
        this.initAdd();
      }
    })
  },
  // 左侧的点击事件
  showShop(e) {
    let num = 0;
    let shop = e.target.dataset.shop;
    let count = this.data.goods1;
    let categoryId = e.target.dataset.id;
    this.setData({
      toView: 'b'+categoryId,
      sign: categoryId,
    })
  },

  // 点击添加商品数
  addCar: function(e) {
    let id = e.currentTarget.dataset.id;
    let goods =this.data.goods1;
    // let index = e.currentTarget.dataset.index;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].productId == id) {
        if (!goods[i].count) {
          goods[i].count = 1
        } else {
          goods[i].count += 1
        }
      }
    }
    this.setData({
      goods1: goods
    })
    wx.setStorageSync('goods1', goods);
    this.initAdd();
  },
  // 点击减少商品
  reduce(e) {
    let id = e.currentTarget.dataset.id;
    let goods = this.data.goods1
    // let index = e.currentTarget.dataset.index;
    for (let i = 0; i < goods.length; i++) {
      if (goods[i].productId == id) {
        if (goods[i].count == 1) {
          goods[i].count = ''
        } else {
          goods[i].count -= 1
        }
      }
    }
    this.setData({
      goods1: goods
    })
    wx.setStorageSync('goods1', goods);
    this.initAdd();
  },
  // 计算好自己商品的值count
  initAdd: function() {
    var that=this;
     app.computed(that);
  },
  //搜索
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 组件传出的值
  changeCar(){
    this.setData({
      goods1:wx.getStorageSync('goods1')
    })
  },
  // 分享页面
  onShareAppMessage: function() {
    return {
      title: '你好',
      path: '/pages/category/category',
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547628285169&di=5d55bb34c742c7b428612263b640ddb0&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2Fx1aQpvYVvRECsPjpsEJklg%3D%3D%2F6597927385728079374.jpg&qq-pf-to=pcqq.c2c'
    }
  }
})