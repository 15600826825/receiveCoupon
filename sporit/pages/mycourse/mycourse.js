// pages/mycourse/mycourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeNo:'',
    contentData: [],
    courseSection: [],
    userCourse: {},
    selectArray: [{
      "id": "10",
      "text": "第一章 电竞产业利益方"
    }, {
      "id": "21",
        "text": "第二章 电竞产业利益方"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // this.setData({
    //   tradeNo: options.tradeNo
    // })
    // http://bb95cc17.ngrok.io/center/mini/get?goodsId=course__3117919FEABB46529D1EE0E82E0B537C&tradeNo=201809062213813681536223325682&token=C9B2AACA58FD456C9FEDD7E573D008C7
    wx.request({
      // url: "http://bb95cc17.ngrok.io/center/mini/get?goodsId=" + options.goodsId,
      // data: {
      //   tradeNo: options.tradeNo,
      //   token: wx.getStorageSync('openid')
      // },
      url: "http://bb95cc17.ngrok.io/center/mini/get?goodsId=" + 'course__3117919FEABB46529D1EE0E82E0B537C',
      data: {
        tradeNo: '201809062213813681536223325682',
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        var contentData = [];
        if (res.data.code == 0) {
          that.setData({
            contentData: res.data.data,
            userCourse: res.data.data.userCourse,
            courseSection: res.data.data.courseChapter[0].courseSection,
          })    
          wx.hideLoading();
        }
      }
    });
  },

  bindSelectSection:function(e){
    var sectionId = e.currentTarget.dataset.id, sectionType = e.currentTarget.dataset.type;
    if (sectionType == 1){
      wx.navigateTo({ url: `../coursevideo/coursevideo?sectionId=${sectionId}&tradeNo=${this.data.tradeNo}` })
    }
    else if (sectionType == 2){
      wx.navigateTo({ url: `../coursepdf/coursepdf?sectionId=${sectionId}&tradeNo=${this.data.tradeNo}` })
    }
    else{
      wx.showToast({
        title: '小程序暂不支持章节测试，请登录study.sporit.cn进行章节测试',
        icon: 'none',
        duration: 2000
      })
    }
    
  },

  learnCourse:function(e){
    if (this.data.userCourse.sectionType == 1) {
      wx.navigateTo({ url: `../coursevideo/coursevideo?sectionId=${this.data.userCourse.sectionId}&tradeNo=${this.data.tradeNo}` })
    }
    else if (this.data.userCourse.sectionType == 2) {
      wx.navigateTo({ url: `../coursepdf/coursepdf?sectionId=${this.data.userCourse.sectionId}&tradeNo=${this.data.tradeNo}` })
    }
    else {
      wx.showToast({
        title: '小程序暂不支持章节测试，请登录study.sporit.cn官方网站进行章节测试',
        icon: 'none',
        duration: 2000
      })
    }
  },

  selectOption:function(e){
    console.log(e)
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