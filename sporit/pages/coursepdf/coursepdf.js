// pages/coursepdf/coursepdf.js
var pdf = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData:[],
    pages: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.pdf('hehe')  
    var that = this;
    this.setData({
      sectionId: options.sectionId,
      tradeNo: options.tradeNo
    })
    wx.request({
      url: "http://bb95cc17.ngrok.io/section/mini/learn?sectionId=" + options.sectionId,
      data: {
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.path){
            wx.downloadFile({
              url: 'https://dev.sporit.cn' + res.data.data.path,
              success: function (res) {
                var filePath = res.tempFilePath;
                console.log(filePath)
                wx.openDocument({
                  filePath: filePath,
                  success: function (res) {
                    console.log('打开文档成功')
                  },
                  fail: function (res) {
                    console.log('打开文档失败')
                  },
                })
              }
            })
            // wx.downloadFile({
            //   url: res.data.data.path,
            //   success: function (res) {
            //     console.log(res)
            //     var Path = res.tempFilePath;              //返回的文件临时地址，用于后面打开本地预览所用
                
            //   },
            //   fail: function (res) {
            //     console.log(res)
            //   }
            // })
          }
        }
      }
    });
    // wx.downloadFile({
    //   url: 'https://*****.***.work/videos/test2.pdf',
    //   success: function (res) {
    //     console.log(res)
    //     var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
    //     wx.openDocument({
    //       filePath: Path,
    //       success: function (res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },

  renderPage:function(num) {
    if (this.contentType == 2) {
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        let canvas = document.getElementById('the-canvas' + num)
        let ctx = canvas.getContext('2d')
        let dpr = window.devicePixelRatio || 1
        let bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
        let ratio = dpr / bsr
        var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width - 262 + 'px'
        canvas.style.height = viewport.height - 262 + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (_this.pages > num) {
          _this.renderPage(num + 1)
        }
      })
    }
  },

  loadFile:function(url) {
    if (common.notNull(url)) {
      let _this = this;
      PDFJS.GlobalWorkerOptions.workerSrc = '../../../../static/build/pdf.worker.js';
      PDFJS.workerSrc = '../../../../static/build/pdf.worker.js';
      PDFJS.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.pages = _this.pdfDoc.numPages
        _this.$nextTick(() => {
          _this.renderPage(1);
          _this.loading = false;
          _this.postLearnRecord();
        })
      })
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