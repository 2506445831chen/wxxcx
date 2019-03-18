const app = getApp();
Component({
  properties: {
    show:{
    type: Object,
    value: []
  }
  },

  data: {
  },

  methods: {
    order() {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    },
   
  }
})