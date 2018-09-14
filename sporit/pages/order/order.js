// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData:[],
    total: 0,
    pageNo: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/order/mini/orderlist",
      data: {
        token: wx.getStorageSync('openid'),
        pageNo: 0,
        pageSize: 10,
      },
      method: "GET",
      success: function (res) {
        var contentData = [];
        if (res.data.code == 0) {
          that.setData({
            total: res.data.total,
            contentData: res.data.data
          })
          wx.hideLoading();
        }
      }
    });
  },

  bindPayOrder:function(e){
    let that = this, orderId = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: "http://bb95cc17.ngrok.io/pay/mini/pay?token=" + wx.getStorageSync('openid') + '&orderId=' + orderId,
      header: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            goodsType: res.data.data.goodsType
          })
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp + '',
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            success(res) {
              wx.hideLoading();
              // app.globalData.goodsType = that.data.goodsType;
              wx.switchTab({ url: `pages/learn/learn` });
            },
            fail(res) {
              wx.showToast({ title: '取消支付', icon: 'none' })
            }
          })
        }
      }
    });

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