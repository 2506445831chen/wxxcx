const app = getApp();
Component({
  properties: {
    num: {
      type: Number,
      value: Number
    },
    pricetotal: {
      type: Number,
      value: Number
    },
    goods1: {
      type: Array,
      value: Object
    },
    language: {
      type: Object,
      value: Object
    }
  },
  data: {
    num: 2,
    pricetotal: 25,
    image: '/img/icon.png',
    order: [],
    goods1:[],
    style: 'display:none',
    style1: 'display:none',
  },
  methods: {
  // 首页选好按钮
    order() {
      var unline = wx.getStorageSync('unline');
      var that = this;
      var products = wx.getStorageSync('products');
      if (unline=="false"){
        wx.showToast({
          title: '商家已下线',
          icon:'none',
        })
      }else{
        app.init({
          url: 'queryTotalAmount',
          data: {
            products: JSON.stringify(products)
          },
          success: (result) => {
            let data = app.errAlert(result);
            if (data) {
              wx.setStorageSync('pricetotal', data.productPrice)
              that.toCar();
            } else { };
          }
        })
      }
     
    },
    toCar: function() {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    },
    dataOrder: function() {
      let data = [];
      let order = wx.getStorageSync('goods1');
      //  order=JSON.parse(order)
      console.log(order);
      order.forEach((v, k) => {
        if (v.count) {
          data.push(v)
        }
      })
      this.setData({
        order: data
      })
    },
    showDelete: function() {
      this.setData({
        style: '',
      })
      this.dataOrder();
    },
    deleteAlert: function() {
      this.setData({
        style1: '',
      })
    },
    normal: function() {
      this.setData({
        style: 'display:none',
      })
    },
    deleteOrder: function() {
      this.setData({
        order: []
      })
      this.cancel();
      this.normal();
      var clear=wx.getStorageSync('clear');
      wx.setStorageSync('goods1', clear);
      this.initAdd()
    },
    cancel: function() {
      this.setData({
        style1: 'display:none',
      })
    },
    // 计算好自己商品的值count
    initAdd: function() {
      var that = this;
      app.computed(that);
      this.dataOrder();
      this.changeParentData();
    },
    // 点击添加商品数
    addCar: function(e) {
      let id = e.currentTarget.dataset.id;
      console.log(id)
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
    // 组件调用页面刷新
    changeParentData: function () {
      var myEventDetail = {
      
      } // detail对象，提供给事件监听函数
      var myEventOption = {

      } // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption);
    }

  }
})