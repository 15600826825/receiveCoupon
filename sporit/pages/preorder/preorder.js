// pages/preorder/preorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    extraServer: 0,
    switchService: false,
    goodsType: 0,
    goodsPrice: 0,
    couponPrice: 0,
    contentData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    this.setData({
      goodsId: options.courseId
    })   
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: "http://bb95cc17.ngrok.io/order/mini/precreate/" + this.data.goodsId,
      data: {
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            contentData: res.data.data,
            goodsPrice: res.data.data.price
          })         
          wx.hideLoading();                   
        }  
      }
    });
  },

  switchChange:function(e){
    let that = this;
    if (e.detail.value){
      this.setData({
        extraServer: 1,
        goodsPrice: that.data.contentData.price + 300
      })
    }
    else{
      this.setData({
        extraServer: 0,
        goodsPrice: that.data.contentData.price
      })
    }
  },

  bindtapService: function () {
    wx.showActionSheet({
      itemList: ['课程永久学习权限', '内容翔实的学习手册', '及时巩固知识点的课后测试','检验学习效果的课程考试','企业联合认证的学习证书'],
      success: function (res) {
      },
      fail: function (res) {
      }
    })
  },

  bindtapCoupon:function(){
    wx.navigateTo({ url: `../coupon/coupon?courseId=${this.data.goodsId}`})
  },

  bindtapPayOrder:function(){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: "http://bb95cc17.ngrok.io/order/mini/create?token=" + wx.getStorageSync('openid'),
      header: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        goodsid: that.data.contentData.goodsId,
        couponid: '',
        extraServer: that.data.extraServer,
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            goodsType: res.data.data.goodsType
          })
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp+'',
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            success(res) {  
              wx.hideLoading(); 
              app.globalData.goodsType = that.data.goodsType;
              wx.switchTab({url: `pages/learn/learn`});  
            },
            fail(res) {
              wx.showToast({ title: '取消支付', icon: 'none' })
            }
          })
        }
      }
    });
  } 
})