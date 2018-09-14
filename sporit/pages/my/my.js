// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg:'../../images/image/my-default.png',
    userName: '请点击头像获取信息',
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得全局对象
    if (wx.getStorageSync('user')){
      let user = wx.getStorageSync('user');
      this.setData({
        userImg: user.userImage,
        userName: user.userNickname
      })
    }  
  },

  bindGetUserInfo: function (e) {
    let that = this;
    wx.login({
      success: res => {
        let jscode = res.code;
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  wx.request({
                    url: "https://study.sporit.cn/school/user/mini/add",
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      token: wx.getStorageSync('openid'),
                      iv: res.iv,
                      data: res.encryptedData,
                      jscode: jscode
                    },
                    method: "POST",
                    success: function (res) {
                      if (res.data.code == 0) {   
                        let user = res.data.data;
                        that.setData({
                          userImg: user.userImage,
                          userName: user.userNickname
                        })
                        wx.setStorageSync('user', that.user)                        
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
  },

})