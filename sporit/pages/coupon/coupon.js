// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    couponList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })

    if (options.courseId){
      this.setData({
        goodsId: options.courseId
      })
      wx.request({
        url: "http://bb95cc17.ngrok.io/coupon/mini/get/" + options.courseId,
        data: {
          token: wx.getStorageSync('openid')
        },
        method: "GET",
        success: function (res) {
          if (res.data.code == 0) {
            let data = res.data.data;
            for (var index in data) {
              data[index].select = false;
            }
            that.setData({
              couponList: res.data.data
            })           
            wx.hideLoading();
          }
        }
      });
    }
    else{
      wx.request({
        url: "http://bb95cc17.ngrok.io/coupon/mini/couponlist",
        data: {
          token: wx.getStorageSync('openid')
        },
        method: "GET",
        success: function (res) {
          if (res.data.code == 0) {
            that.setData({
              couponList: res.data.data
            })
            wx.hideLoading();
          }
        }
      });
    }  
  },

  // 选择优惠券
  bindSelectCoupon:function(e){
    if(this.data.goodsId){
      var that = this,
        data = this.data.couponList;
      if (data[e.currentTarget.dataset.index].select == false && data[e.currentTarget.dataset.index].canUse == false) {
        for (var index in data) {
          if (e.currentTarget.dataset.index == index) {
            data[index].select = true;
          }
          else {
            data[index].select = false;
          }
        }
      }
      else {
        for (var index in data) {
          data[index].select = false;
        }
      }
      that.setData({
        couponList: data
      }) 
    }
    else{
      wx.switchTab({ url: `../index/index` });
    } 
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