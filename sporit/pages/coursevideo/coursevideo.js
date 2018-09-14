// pages/coursevideo/coursevideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentData:[],
    sectionId: '',
    tradeNo:'',
    courseId: '',
    comments:'',
    pageNo: 0,
    total: 0,
    buttonDisabled:true,
    userCourseIsDone: 0,
    userCourseTime: 0,
    userCourseCurrentTime: 0,
    commentData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      sectionId: options.sectionId,
      courseId: options.courseId,
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
          that.setData({
            userCourseTime: res.data.data.durationInt,
            contentData: res.data.data,
          })
          wx.hideLoading();
        }
      }
    });
    this.getCommentData(0); 
    this.getRecordData();  
  },

  //获取评论列表
  getCommentData: function (pageNo){
    var that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/comments/mini/get?connectId=" + this.data.sectionId,
      data: {
        pageNo: pageNo,
        pageSize: 10,
        token: wx.getStorageSync('openid')
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          if (pageNo>0){
            let data = that.data.commentData.concat(res.data.data);
            that.setData({
              total: res.data.total,
              commentData: data
            })
          }
          else{
            that.setData({
              total: res.data.total,
              commentData: res.data.data
            })
          }   
          wx.hideLoading();
        }
      }
    });
  },

  //获取学习记录
  getRecordData:function(){
    var that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/learn/mini/record/get?connectId=" + this.data.sectionId,
      data: {
        token: wx.getStorageSync('openid'),
        courseId: this.data.courseId,
        tradeNo: this.data.tradeNo
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          var data = res.data.data;
          if (data.userCourse){
            that.setData({
              userCourseIsDone: data.userCourse.userCourseIsDone
            })
            if (that.data.userCourseIsDone==0){
              that.setData({
                userCourseCurrentTime: data.userCourse.userCourseCurrentTime
              })              
            }
          } 
          wx.hideLoading();
        }
      }
    });
  },

  postRecordData: function() {
    var that = this;
    wx.request({
      url: "http://bb95cc17.ngrok.io/learn/mini/record?token=" + wx.getStorageSync('openid'),
      data: {
        sectionId: this.data.sectionId,
        courseId: this.data.courseId,
        tradeNo: this.data.tradeNo,
        userCourseIsDone: this.data.userCourseIsDone,
        userCourseCurrentTime: this.data.userCourseCurrentTime,
        userCourseTime: this.data.userCourseTime
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
        }
      }
    });
  },


  // 提交评价
  evaSubmit:function(e){  
    var that = this;
    if (this.data.comments){
      wx.request({
        url: "http://bb95cc17.ngrok.io/comments/mini/comment?token=" + wx.getStorageSync('openid'),
        data:{
          connectId: this.data.sectionId,
          commentsContent: this.data.comments
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '评价成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              comments: ''
            });
            that.getCommentData(0)
          }
          else{
            wx.showToast({
              title: '评价失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '评价不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },


  charChange: function (e) {
    this.setData({
      comments: e.detail.value
    });
  },
// 点赞
  bindLike:function(e){
    let that = this, commentsId = e.currentTarget.dataset.id;
    wx.request({
      url: "http://bb95cc17.ngrok.io/comments/mini/like?token=" + wx.getStorageSync('openid'),
      data: {
        commentsId: commentsId,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 2000
          })
          that.getCommentData(0);   
        }
        else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },


  bindplay: function (e) {
    if (this.data.userCourseIsDone==0){
      this.postRecordData();
    }
  },

  bindpause: function (e) {
    if (this.data.userCourseIsDone == 0) {
      this.postRecordData();
    }
  },

  bindended: function (e) {
    if (this.data.userCourseIsDone == 0) {
      this.postRecordData();
    }
  },

  bindtimeupdate: function (e) {
    this.setData({
      userCourseCurrentTime: parseInt(e.detail.currentTime)
    })
  },

  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

// 加载更多评论
  loadMoreComment: function (e) {
    let that = this;
    if (this.data.total > this.data.commentData.length) {
      this.data.pageNo = this.data.pageNo + 1;
      this.getCommentData(this.data.pageNo);
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
    if (this.data.userCourseIsDone == 0) {
      this.postRecordData();
    }
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