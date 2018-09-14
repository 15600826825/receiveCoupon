// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: '../../images/image/my-default.png',
    date:'',
    region: ['广东省', '广州市', '海珠区'],
    array: ['小学', '初中', '高中', '中专', '大专', '本科', '硕士','博士'],
    position: ['计算机软件', '计算机硬件', '计算机服务/系统/数据服务/维修', '通信/电信/网络设备', '通信/电信运营/增值服务', '互联网/电子商务', '网络游戏', '电子技术/半导体/集成电路', '仪器仪表/工业自动化', '会计/审计', '金融/投资/证券', '银行', '保险', '贸易/进出口', '批发/零售', '快速消费品/食品/饮料/化妆品', '服装/纺织/皮革', '家具/家电/工艺品/玩具', '办公用品及设备', '机械/设备/重工', '汽车及零配件', '制药/生物工程', '医疗/护理/保健/卫生', '医疗设备/器械', '广告', '公关/市场推广/会展', '影视/媒体/艺术', '文字媒体/出版', '印刷/包装/造纸', '房地产开发', '建筑与工程', '家居/室内设计/装潢', '物业管理/商业中心', '中介服务', '专业服务/咨询/人力资源', '检测/认证', '法律', '教育/培训', '学术/科研', '餐饮业', '酒店/旅游"', '娱乐/休闲/体育', '美容/保健', '生活服务', '交通/运输/物流', '航天/航空', '石油/化工/矿产/地质', '采掘业/冶炼', '电力/水利', '原材料和加工', '政府', '非盈利机构', '环保', '农业/渔业/林业', '多元化业务集团公司','其他行业'],
    userDegreeData: [
      {
        label: '小学',
        value: 1
      },
      {
        label: '初中',
        value: 2
      },
      {
        label: '高中',
        value: 3
      },
      {
        label: '中专',
        value: 4
      },
      {
        label: '大专',
        value: 5
      },
      {
        label: '本科',
        value: 6
      },
      {
        label: '硕士',
        value: 7
      },
      {
        label: '博士',
        value: 8
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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