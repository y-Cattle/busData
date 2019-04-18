// pages/menu/menu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data: {},
    dataNum: 4,
    userNum: null
  },



  toDetail(event) {
    // console.log(event);
    let index = event.currentTarget.dataset.index;
    let listData = JSON.stringify(this.data.list_data);
    wx.navigateTo({
      url: '../../pages/detail0/detail0?index=' + index + '&listData=' + listData,
      success: function (res) {
        // console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  moveToWeather() {
    wx.navigateTo({
      url: "/pages/weather/weather",
    })
  },
  moveToDayData(){
    wx.navigateTo({
      url: "/pages/day/day",
    })
  },
  moveToMonthData(){
    wx.navigateTo({
      url: "/pages/month/month",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    setTimeout(
      function(){
        wx.hideLoading()
      },1000
    )
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
    let dataNum = this.data.dataNum;
    wx.getStorage({
      key: 'nickName',
      success: (res) => {
        console.log('getStorage')
        console.log(res);
        this.setData({
          nickName: res.data
        })
        let openId = app.globalData.userGlobleInfo.openId;
        console.log('openId');
        console.log(openId);
        wx.request({
          url: 'http://localhost/wx/judge.php',
          data: {
            nickName: this.data.nickName,
            openId: openId
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log('requestSuccess')
            console.log(res);
            let userNum = res.data.num.loginNum
            this.setData({
              userNum: userNum
            })
            wx.setStorageSync('userNum', userNum);

            if (userNum) {
              wx.request({
                url: 'http://localhost/wx/sqlCon.php',
                data: {
                  'num': userNum,
                  'avatar': app.globalData.userGlobleInfo.avatarUrl,
                  'dataNum': dataNum
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                  console.log("res");
                  console.log(res.data);
                  if (res.data.user[1]) {
                    this.setData({
                      list_data: res.data.user,
                      flag: false
                    })

                  } else {
                    wx.showToast({
                      title: '请输入正确编号',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  // console.log(this.data)
                },
                fail: (res) => {
                  console.log(res)
                }
              })
            }

          }
        })
      }
    })
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