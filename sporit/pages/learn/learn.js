// pages/programdetail/programdetail.js
var tabs = [
  {
    name: "精品课"
  },
  {
    name: "证书课"
  },
  {
    name: "公开课"
  }
];

var toView = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    scrollLeft: 0,
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    contentData: [],
    leftTopData: [],
    centerData: [],
    rightData: [],
    pageNo: 0,
    total: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.showLoading({
      title: '加载中...',
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });
    this.getLeftCourse();
  },

  //精品课列表 
  getLeftCourse: function(){
    let that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/center/mini/courselist",
      data: {
        pageNo: 0,
        pageSize: 10,
        token: wx.getStorageSync('openid')
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

  //证书课列表 
  getPakeageCourse: function () {
    let that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/center/mini/packagelist",
      data: {
        pageNo: 0,
        pageSize: 10,
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

  // 转发
  // onShareAppMessage(res) {
  //   return {
  //     title: '体育商业学习第一站',
  //     path: '/pages/index/index'
  //   }
  // },

  //证书课详情跳转 
  bindPackageDetail: function(e){
    console.log(e.currentTarget.dataset)
    let that = this, goodsId = e.currentTarget.dataset.goodsid, tradeNo = e.currentTarget.dataset.tradeno;
    wx.navigateTo({ url: `../programlist/programlist?goodsId=${goodsId}&tradeNo=${tradeNo}` })
  },

  //课程详情跳转 
  bindCourseDetail: function (e) {
    let that = this, goodsId = e.currentTarget.dataset.goodsid, tradeNo = e.currentTarget.dataset.tradeno;
    wx.navigateTo({ url: `../mycourse/mycourse?goodsId=${goodsId}&tradeNo=${tradeNo}` })
  },

  // tab切换
  bindChange: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      contentData: [],
      pageNo: 0,
      total: 0,
    });
    wx.showLoading({
      title: '加载中...',
    })

    if (current == 0){
      this.getLeftCourse()
    }
    else if (current == 1){
      this.getPakeageCourse()
    }
    else{
      this.getLeftCourse()
    }

    // var current = e.detail.current, that = this, courseCategory = '', pageNo = this.data.pageNo, total = this.data.total;
    // this.setData({
    //   activeIndex: current,
    //   sliderOffset: this.data.sliderWidth * current,
    //   scrollTop: 0,
    //   scrollLeft: 0
    // });
    // if (current == 1) {
    //   wx.request({
    //     url: "https://study.sporit.cn/school/fpackage/mini/list",
    //     data: {
    //       pageNo: pageNo,
    //       pageSize: 10,
    //       token: wx.getStorageSync('openid')
    //     },
    //     method: "GET",
    //     success: function (res) {
    //       var left = [];
    //       var leftTop = [];
    //       if (res.data.code == 0) {
    //         that.setData({
    //           total: res.data.total,
    //           leftData: res.data.data
    //         })
    //         wx.hideLoading();
    //       }
    //     }
    //   });
    // }
    // else {
    //   if (current == 0) {
    //     courseCategory = "2"
    //   }
    //   else {
    //     courseCategory = "1"
    //   }

    //   wx.request({
    //     url: "https://study.sporit.cn/school/fcourse/mini/list",
    //     data: {
    //       pageNo: pageNo,
    //       pageSize: 10,
    //       courseCategory: courseCategory,
    //       token: wx.getStorageSync('openid')
    //     },
    //     method: "GET",
    //     success: function (res) {
    //       var left = [];
    //       var leftTop = [];
    //       if (res.data.code == 0) {
    //         that.setData({
    //           total: res.data.total
    //         })
    //         for (var i in res.data.data) {
    //           if (i > 2) {
    //             left.push(res.data.data[i]);
    //             that.setData({
    //               leftData: left
    //             })
    //           }
    //           else {
    //             leftTop.push(res.data.data[i]);
    //             that.setData({
    //               leftTopData: leftTop
    //             })
    //           }
    //         }
    //         wx.hideLoading();
    //       }
    //     }
    //   });
    // }
  },

  // loadMoreLeft() {
  //   let that = this;
  //   if (this.data.total > (this.data.leftData.length + this.data.leftTopData.length)) {
  //     this.data.pageNo = this.data.pageNo + 1;
  //     wx.request({
  //       url: "https://study.sporit.cn/school/fcourse/mini/list",
  //       data: {
  //         pageNo: this.data.pageNo,
  //         pageSize: 10,
  //         courseCategory: '1',
  //         token: wx.getStorageSync('openid')
  //       },
  //       method: "GET",
  //       success: function (res) {
  //         if (res.data.code == 0) {
  //           let data = that.data.leftData.concat(res.data.data);
  //           that.setData({
  //             leftData: data
  //           })
  //         }
  //       }
  //     });
  //   }
  // },

  // loadMoreCenter() {
  //   let that = this;
  //   if (this.data.total > (this.data.leftData.length + this.data.leftTopData.length)) {
  //     this.data.pageNo = this.data.pageNo + 1;
  //     wx.request({
  //       url: "https://study.sporit.cn/school/fcourse/mini/list",
  //       data: {
  //         pageNo: this.data.pageNo,
  //         pageSize: 10,
  //         courseCategory: '2',
  //         token: wx.getStorageSync('openid')
  //       },
  //       method: "GET",
  //       success: function (res) {
  //         if (res.data.code == 0) {
  //           let data = that.data.leftData.concat(res.data.data);
  //           that.setData({
  //             leftData: data
  //           })
  //         }
  //       }
  //     });
  //   }
  // },

  // loadMoreRight() {
  //   let that = this;
  //   if (this.data.total > this.data.leftData.length) {
  //     this.data.pageNo = this.data.pageNo + 1;
  //     wx.request({
  //       url: "https://study.sporit.cn/school/fpackage/mini/list",
  //       data: {
  //         pageNo: this.data.pageNo,
  //         pageSize: 10,
  //         token: wx.getStorageSync('openid')
  //       },
  //       method: "GET",
  //       success: function (res) {
  //         var left = [];
  //         var leftTop = [];
  //         if (res.data.code == 0) {
  //           let data = that.data.leftData.concat(res.data.data);
  //           that.setData({
  //             leftData: data
  //           })
  //         }
  //       }
  //     });
  //   }
  // },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})