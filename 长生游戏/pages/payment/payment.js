const app = getApp();
const md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pricetotal: 0,
    pay: 0,
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
  },
  // sign的获取
  sign(){
 console.log('获取sign')
    var that = this
    var stringSignTemp = 'appid=wxd678efh567hg6787&body=abcd&mch_id=1230000109&nonce_str=' + that.randomWord(9, 32, 32) + 'device_info=013467007045764&key=a69cbfe34e175c895cc36eabe5b521f9'
   return md5.hexMD5(stringSignTemp).toUpperCase();

  },
  // 获取code码
  getCode(that){
    //登陆获取code
    wx.login({
      success: function (res) {
        console.log(res.code)
        //获取openid
        that.getOpenId(res.code)
      }
    });
  },
  // 获取openId
  getOpenId(code) {
    var that = this;
    wx.request({
      url: "https://api.weixin.qq.com/sns/jscode2session?appid=wxb2212a5772ca5f38&secret=a69cbfe34e175c895cc36eabe5b521f9&js_code=" + code + "&grant_type=authorization_code",
      data: {},
      method: 'GET',
      success: function(res) {
        console.log("输出" + JSON.stringify(res))
        console.log('开始转换xml')
        // 转换成xml数据并进行请求
        that.jsonToXml(res.data.openid);
      },
    })
  },

  /**生成商户订单 */
  generateOrder: function(xml) {
    var that = this
    console.log('xml' + JSON.stringify(xml.data))
    var sign =this.sign();
    console.log('sign' + sign)
    console.log('开始转换成xml数据')
    //统一支付
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      method: 'POST',
      data: {
       data:xml.data
        // appid: 'wxb2212a5772ca5f38',
        // body: 'abcd',
        // mch_id: '1230000109',
        // nonce_str: that.randomWord(9, 32, 32),
        // notify_url: 'http://www.weixin.qq.com/wxpay/pay.php',
        // openId: openid,
        // out_trade_no: '20150806125346',
        // spbill_create_ip: '123.12.12.123',
        // total_fee: '0.01',
        // trade_type: 'JSAPI--JSAPI',
        // sign: sign,
      },
      success: function(res) {
        console.log('获取到prepay_id')
        console.log(JSON.stringify(res))
        console.log('开始转换为json')
        that.xmlToJson(res)
      },
    })
  },
  // 转换 xml提交信息
  xmlToJson: function(res) {
    var sign =this.sign();
    console.log('sign' + sign)
    var that = this
    console.log('开始xml')
    console.log(res.data)
    app.init({
      url: 'xmlToJson',
      data: {
        xml: res.data,
      },
      success: (res) => {
       var prepay_id=res.data.msg
        console.log('得到parpay_id 开始前端的支付' + JSON.stringify(res) )
        that.pay(prepay_id);
      }
    })
  },

  // JSON形式的传参
  jsonToXml: function(openid) {
    var that = this;
    var sign =this.sign()
    console.log('sign' + sign)
    console.log('开始转换xml')
    var data0 = {
      appid: 'wxb2212a5772ca5f38',
      body: 'abcd',
      mch_id: '1230000109',
      nonce_str: that.randomWord(9, 32, 32),
      notify_url: 'http://www.weixin.qq.com/wxpay/pay.php',
      openid: openid,
      out_trade_no: '20150806125346',
      spbill_create_ip: '123.12.12.123',
      total_fee: '0.01',
      trade_type: 'JSAPI',
      sign: sign,
    };
    console.log(JSON.stringify(data0))
    app.init({
      url: 'jsonToXml ',
      data: {
        json: JSON.stringify(data0)
      },
      success: (res) => {
        console.log('转换成功')
        console.log('开始获取prepay_id')
        console.log(res)
        // 获取prepay_id
        that.generateOrder(res)
      }
    })
  },
  /* 支付  */
  pay: function (prepay_id) {
    var sign =this.sign();
    console.log(sign)
    // sign = hash_hmac("sha256", stringSignTemp, key).toUpperCase()
    var that = this;
    var time = (new Date()).valueOf();
    time = JSON.stringify(time);
    console.log(time)
    console.log(that.randomWord(9, 32, 32))
    console.log(sign)
    console.log(prepay_id)
    console.log("支付")
    wx.requestPayment({
      timeStamp: time,
      nonceStr: that.randomWord(9, 32, 32),
      package: prepay_id.return_msg,
      signType: 'MD5',
      paySign: sign,
      success: function(res) {
        console.log('解决了加油')
        console.log(res)
        // success

      },
      fail: function(res) {
        console.log(res)
        console.log('失败了加油')
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // navergator(){
  // wx.navigateTo({
  //   url: '/pages/order/order',
  // })
  // },
  // 订单数据的生成
  payorder() {
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    if (this.data.pay == 2) {
      let price = wx.getStorageSync('pricetotal');
      let products = wx.getStorageSync('products');
      app.init({
        url: 'createOrder',
        data: {
          buyerName: userInfo.nickName,
          buyerPhone: '',
          buyerAddress: '',
          buyerOpenid: "",
          sellerId: wx.getStorageSync('sellerid'),
          orderAmount: price,
          products: JSON.stringify(products)
        },
        success: (result) => {
          var data = app.errAlert(result)
          if (data) {
            let goods = data
            wx.setStorageSync('orderid', goods)
            wx.navigateTo({
              url: '/pages/result/result',
            })
          } else {

          }
        }
      })
    }
    console.log(this.randomWord(9, 32, 32))
    console.log(1)
    if (this.data.pay == 1) {
      this.getCode(that)
      // this.weChat(userInfo);
    }
  },

  // 微信支付调用函数
  // weChat(userInfo) {
  //   console.log(userInfo);
  //   var time = (new Date()).valueOf();
  //   time = JSON.stringify(time);
  //   var that = this;
  //   wx.requestPayment({
  //     timeStamp: time,
  //     nonceStr: that.randomWord(9, 32, 32),
  //     package: 'prepay_id=',
  //     signType: 'MD5',
  //     paySign: '',
  //     success(res) {
  //       console.log('支付成功')
  //     },
  //     fail(e) {
  //       console.log(e)
  //       console.log('支付失败')
  //     },
  //     complete(e) {}
  //   })
  //   //   }
  //   // })
  // },
  // 微信支付判断值得定义
  active() {
    this.setData({
      pay: 1
    })
  },

  // 支付的随机字符串

  randomWord(randomFlag, min, max) {
    var pos = '';
    var str = "";
    var range = min;
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  },

  // 现金支付
  active1() {
    this.setData({
      pay: 2
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.totalprice();
    this.language();
  },
  totalprice() {
    let pricetotal = wx.getStorageSync('pricetotal')
    this.setData({
      pricetotal: pricetotal,
    })
  },
  language() {
    let language = wx.getStorageSync('language');
    this.setData({
      language: language,
    })
  },
})