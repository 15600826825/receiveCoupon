Page({
  
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  data: {
    src: '',
    contentShow: false,
    tab_image: "block",
    contentText:'查看完整大纲',
    contentData:{},
    getPhone: false,
    courseId:'',
    courseName:''
  },

  onLoad: function (options) {
    var that = this;
    this.setData({
      courseId: options.courseId,
      courseName: options.courseName,
    })

    wx.setNavigationBarTitle({
      title: this.data.courseName
    })
    
    wx.showLoading({
      title: '加载中...',
    })

    if (wx.getStorageSync('getPhone')){
      this.setData({
        getPhone:true
      })
    }

    wx.request({
      url: "http://bb95cc17.ngrok.io/fcourse/mini/get/" + this.data.courseId,
      data: {
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        that.setData({
          contentData: res.data.data
        })
        wx.hideLoading();
        wx.setNavigationBarTitle({
          title: that.data.contentData.courseName
        })
      }
    });
  },

  // 转发
  onShareAppMessage(res) {
    return {
      title: this.data.courseName,
      path: `pages/coursedetail/coursedetail?courseId=${this.data.courseId}`
    }
  },
  
  bindTapPay:function(){
    wx.navigateTo({ url: `../preorder/preorder?courseId=${this.data.courseId}` })
  },

  // getPhoneNumber: function (e) {
  //   if (e.detail.errMsg == 'getPhoneNumber:ok') {
  //     wx.login({
  //       success: res => {
  //         let jscode = res.code,that = this;
  //         wx.getSetting({
  //           success: function (res) {
  //             if (res.authSetting['scope.userInfo']) {
  //               // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //               wx.getUserInfo({
  //                 success: function (res) {
  //                   wx.request({
  //                     url: "https://study.sporit.cn/user/mini/updatephone",
  //                     header: {
  //                       'Content-Type': 'application/x-www-form-urlencoded'
  //                     },
  //                     data: {
  //                       token: wx.getStorageSync('openid'),
  //                       iv: e.detail.iv,
  //                       data: e.detail.encryptedData,
  //                       jscode: jscode
  //                     },
  //                     method: "POST",
  //                     success: function (res) {
  //                       wx.setStorageSync('getPhone', true)
  //                       that.setData({
  //                         getPhone: true
  //                       })
  //                       if (res.data.code == 0) {
  //                         wx.showModal({
  //                           title: '提示',
  //                           showCancel: false,
  //                           content: '您已成功领取优惠券，请在study.sporit.cn扫码登录后购买课程。',
  //                           success: function (res) {
  //                           }
  //                         })                      
  //                       }
  //                       else{
  //                         wx.showModal({
  //                           title: '提示',
  //                           showCancel: false,
  //                           content: '您已领取优惠券，不可重复领取，请在study.sporit.cn扫码登录后购买课程。',
  //                           success: function (res) { }
  //                         })
  //                       }
  //                     }
  //                   });
  //                 },
  //                 fail: function () {

  //                 }
  //               })
  //             }
  //           }
  //         })
  //       }
  //     })
  //   } else { 
  //     wx.showModal({
  //       title: '提示',
  //       showCancel: false,
  //       content: '未授权',
  //       success: function (res) { }
  //     })
  //   }
  // },


  bindplay: function (e) {
    this.setData({
      tab_image: "none"
    })
  },

  changeContent: function (e) {
    if (this.data.contentShow){
      this.setData({
        contentShow: false,
        contentText: '查看完整大纲'
      })
    }
    else{
      this.setData({
        contentShow: true,
        contentText: '收起'
      })
    }
     
  },

  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})