// pages/coursedetail/coursedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentShow: false,
    contentData: {},
    getPhone: false,
    packageId: '',
    packageName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      packageId: options.packageId,
      packageName: options.packageName
    })
      wx.showLoading({
        title: '加载中...',
      })
    if (wx.getStorageSync('getPhone')) {
      this.setData({
        getPhone: true
      })
    }

    wx.setNavigationBarTitle({
      title: this.data.packageName
    })

    wx.request({
      url: "https://study.sporit.cn/fpackage/mini/get/" + this.data.packageId,
      data:{
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          let data = res.data.data.courses;

          for (var index in data) {
            data[index].unfold = false;
          }   

          that.setData({
            contentData: res.data.data
          }) 
          wx.hideLoading();
          wx.setNavigationBarTitle({
            title: that.data.contentData.packageName
          })
        }
      }
    });
  },

  // 转发
  onShareAppMessage(res) {
    return {
      title: this.data.packageName,
      path: `pages/programdetail/programdetail?packageId=${this.data.packageId}`
    }
  },

  bindtapNumber: function () {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '您已领取优惠券，不可重复领取，请在study.sporit.cn扫码登录后购买课程。',
      success: function (res) { }
    })
  },

  getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: res => {
          let jscode = res.code, that = this;
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    wx.request({
                      url: "https://study.sporit.cn/user/mini/updatephone",
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        token: wx.getStorageSync('openid'),
                        iv: e.detail.iv,
                        data: e.detail.encryptedData,
                        jscode: jscode
                      },
                      method: "POST",
                      success: function (res) {
                        wx.setStorageSync('getPhone', true)
                        that.setData({
                          getPhone: true
                        })
                        if (res.data.code == 0) {
                          wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '您已成功领取优惠券，请在study.sporit.cn扫码登录后购买课程。',
                            success: function (res) {
                            }
                          })
                        }
                        else {
                          wx.showModal({
                            title: '提示',
                            showCancel: false,
                            content: '您已领取优惠券，不可重复领取，请在study.sporit.cn扫码登录后购买课程。',
                            success: function (res) { }
                          })
                        }
                      }
                    });
                  },
                  fail: function () {

                  }
                })
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    }
  },

  videoErrorCallback: function (options) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  changeContent:function (e) {
    let that = this, index = e.currentTarget.dataset.index;
    for (var i in that.data.contentData.courses) {
      that.data.contentData.courses[i].unfold = false;
    } 
    this.data.contentData.courses[index].unfold = true;
    this.setData({
      contentData: this.data.contentData
    })
  },

  changeContentPack:function (e) {
    let that = this, index = e.currentTarget.dataset.index;
    this.data.contentData.courses[index].unfold = false;
    this.setData({
      contentData: this.data.contentData
    })
  },
})