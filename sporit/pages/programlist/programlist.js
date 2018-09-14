// pages/programlist/programlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    contentData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: "http://bb95cc17.ngrok.io/center/mini/packagecourse?goodsId=" + options.goodsId,
      data: {
        tradeNo: options.tradeNo,
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        var contentData = [];
        if (res.data.code == 0) {
          that.setData({
            contentData: res.data.data
          })
          wx.hideLoading();
        }
      }
    });
  },

  //课程详情跳转 
  bindCourseDetail: function(e) {
    let that = this, goodsId = e.currentTarget.dataset.goodsid, tradeNo = e.currentTarget.dataset.tradeno;
    wx.navigateTo({ url: `../mycourse/mycourse?goodsId=${goodsId}&tradeNo=${tradeNo}` })
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