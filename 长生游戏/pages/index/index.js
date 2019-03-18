const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   language:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.language();
  },
  onGotUserInfo: function (e) {
    wx.login({
      success: res => {
        let userInfo = e.detail.userInfo;
        if (userInfo) {
          wx.setStorageSync("userInfo", userInfo);
          userInfo.code = res.code;
          wx.request({
            url: "https://vtoo36c.hn3.mofasuidao.cn/showAllCategory",
            method: 'post',
            data: userInfo,
            success: res => {
              console.log(res.data);
              let openid = res.data;
              wx.setStorageSync('openid', openid)
              this.setData({
                auth: false,
                userInfo: userInfo
              })
            }
          })
          wx.navigateTo({
            url: '../category/category',
          })
        } else {
          wx.showToast({
            title: '请授权使用你的信息',
            icon:none,
          })
        }
       
      }
    })

  },
  language(data) {
    let e = data.currentTarget.dataset['index'];
    let language = '';
    if (!e) {
      language = app.language.china
      console.log(language)
    }
    if (e == 1) {
      language = app.language.china
    } else if (e == 2) {
      language = app.language.russian
    } else if (e == 3) {
      language = app.language.english
    }
    this.setData({
      language: language
    })
    wx.setStorageSync('language', language)
    wx.navigateTo({
      url: '../category/category',
    })
  },


  sweepCode(){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
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