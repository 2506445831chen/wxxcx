import language from "/utils/language.js"
import computed from "/utils/util.js"
App({
  onLoading:function(){
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(1 + JSON.stringify(res) )
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(2 + JSON.stringify(res))
              wx.setStorageSync('userInfo', res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log(3 + res)
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   
  },
  globalData: {
    userInfo: null
  },
  setNavigationBarTitle(titile) {
    wx.setNavigationBarTitle({
      title: titile
    })
  },
  token: {  token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTAwMzIxMTQyNDksInBheWxvYWQiOiJ7XCJpZFwiOlwiYjQ5ZTJiOTIzMDk3NDc3ODk3YjkxMjhmNzMyN2I5NzFcIixcInVzZXJuYW1lXCI6XCLlpKfnjotcIixcInBhc3N3b3JkXCI6XCIxMTExMTFcIixcIm9wZW5pZFwiOlwiMTIyXCIsXCJjcmVhdGVUaW1lXCI6MTU0OTk3MDcxODAwMCxcInVwZGF0ZVRpbWVcIjoxNTQ5OTcwNzE4MDAwLFwicGhvbmVcIjpcIjExMTExMVwiLFwicm9sZVwiOjF9In0.dwbZWRN3ieU6KNwS2yk5LrW-PoQ6_QyzmkRywnEKFQE"
  },
  url:{
    url: 'http://vtoo36c.hn3.mofasuidao.cn/'
  },
  sellerId:'1001',
  getSellerId(options) {
    if (options.scence) {
      var scene = decodeURIComponent(options.scence);
      return scene
    } else {
      return '1001';
    }
  },
  init(porp){
    wx.request({
      header: {
        "token":this.token.token,
        //'content-type': 'application/json' // 默认值 GET
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      url: this.url.url + porp.url,
      data: porp.data,
      success:porp.success
    })
  },
  // 语言转换
  language: {
    china: language.lan.china,
    english: language.lan.english,
    russian: language.lan.russian
  },
  // 计算
  computed(that) {
    let products = {};
    let num = 0;
    let price = 0;
    var goods = wx.getStorageSync('goods1');
    goods.forEach((v, k) => {
      if (v.count) {
        num = v.count + num;
        price += v.count * (v.productPrice * 100)
        for (let i = 0; i <= k; i++) {
          products[v.productId] = v.count
        }
      }
    });
    price = price / 100;
    that.setData({
      pricetotal: price,
      num: num
    })
    wx.setStorageSync('products', products);
  },
// 接口的校验
 errAlert(result) {
   console.log(result)
    if(result.data.retStatus == 0){
   return result.data.msg
    } else {
     var dataErr=JSON.parse(result.data)
      wx.showToast({
        icon: 'none',
        title: dataErr.msg,
      });
      return
}
},
// 支付数据
//  errAlert(result) {
//     console.log(result);
//    var alertdata = JSON.parse(result.data);
//     console.log(alertdata);
//     var msg = alertdata.msg;
//     var status = alertdata.retStatus;
//     switch(status) {
//         case '0':
//     return msg;
//     break;
//     case "err3":
//     this.alertWarning(msg);
//             return;
//     break;
//     case "err4":
//     alertWarningLogin(msg);
//             return;
//     break;
//     case "err5":
//     alertWarningLogin(msg);
//             return;
//     break;
//     case 'err6':
//     this.alertWarning(msg);
//             return;
//     break;
//     case'err8':
//     this.alertWarning(msg);
//             return;
//     break;
//   }
//     this.alertdanger(msg);
// },
// alertWarning(msg){
// wx.showToast({
//   icon:none,
//   title: msg,
// })
// }
})