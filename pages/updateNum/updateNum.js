// pages/updateNum/updateNum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    figureNum: null,
    loginNum: null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getFigureNum(e){
    console.log(e);
    this.setData({
      figureNum : e.detail.value
    })
  },

  getFigureNum1(e) {
    console.log(e);
    this.setData({
      loginNum: e.detail.value
    })
  },

  autoGet(e){
    wx.getStorage({
      key: 'nickName',
      success: (res)=> {
        console.log('getStorage')
        console.log(res);
        this.setData({
          nickName: res.data
        })
        let openId = getApp().globalData.userGlobleInfo.openId;
        wx.request({
          url: 'http://localhost/wx/judge.php',
          data: {
            nickName: this.data.nickName,
            openId : openId
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log('requestSuccess')
            console.log(res);
            this.setData({
              loginNum: res.data.num.loginNum
            })

          }
        })
      }
    })
  },

  updateNum(e){
    console.log(this.data.figureNum);
    

    if(this.data.figureNum==''){
      wx.showToast({
        title: '编号不能为空',
        icon: 'success',
        duration: 2000
      })
    } else if (this.data.figureNum){
      console.log(e);
      let figureNum = this.data.figureNum
      wx.request({
        url: "http://localhost/wx/updateInfo.php",
        data: {
          figureNum: figureNum,
          loginNum: this.data.loginNum
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: (res)=> {
          console.log(res);
          let result = res.data;
          // console.log(res.data);
          //result=1表示修改成功
          if (result == 1) {
            wx.showLoading({
              title: '修改成功，正在跳转主页面',
              mask:true
            })
            
            wx.switchTab({
              url: '/pages/menu/menu',
            })

            setTimeout(
              function(){
                wx.hideLoading();
              },1000
            )
          } else {
            wx.showModal({
              title: '温馨提示',
              content: '信息录入错误',
              showCancel: false,
              success: function (res) {

              }
            })
          }
          console.log('submit success');
        },
        fail: function (res) {
          wx.showToast({
            title: '您的网络开小差啦~~~',
            icon: "none"
          })
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    } else {
      wx.showToast({
        title: '请将信息填写完整后提交',
        icon: "none"
      })
    }
  },



  onLoad: function (options) {
   
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