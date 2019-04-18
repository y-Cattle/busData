// pages/myMenu/myMenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    nickName:{},
    menuitems:[{
      text: '修改编号'
    },{
      text: '信息录入页'
    },{
      text: 77
    }]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success:(res)=>{
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          nickName: res.userInfo.nickName
        });
      }
    })
    
  },

  update0(event) {
    // console.log(event);
    wx.navigateTo({
      url: '/pages/updateNum/updateNum',
      success: function (res) { },
      fail: function (res) {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: function (res) { },
    })
  },

  update1(event) {
    // console.log(event);
    wx.navigateTo({
      url: '/pages/login/login?nickName=' + this.data.nickName,
      success: function (res) {
       },
      fail: function (res) {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.nickName)
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