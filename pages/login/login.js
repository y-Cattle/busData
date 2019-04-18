// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginNum: undefined,
    number: undefined,
    isDisabled : true,
    isShow: false,
    autoShow: true,
    openId : null,

    imgUrls: [
      '../../images/rotationBg/rotation2.jpg',
      '../../images/rotationBg/rotation1.jpg',
      '../../images/rotationBg/rotation3.jpg',
      '../../images/rotationBg/rotation4.jpg',
      '../../images/rotationBg/rotation5.jpg'
    ]
  },

  //轮播图控制
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  //获取员工编号
  getLoginNum: function (e) {
    console.log(e.detail.value)
    let value = e.detail.value
    if(value.length >= 2 && value.length < 16){
      this.setData({
        loginNum: e.detail.value
      })
      console.log(e.detail.value)
    }else{
      wx.showToast({
        title: '请输入2-15位数字',
        icon: 'none',
        duration: 1500
      })
    }
    
    if (this.data.loginNum && this.data.number) {
      this.setData({
        isDisabled: false
      })
    }
  },
  //获取手机号码
  getNumber: function (e) {
    console.log(e.detail.value)
    let value = e.detail.value
    if (value.length >= 6 && value.length < 15) {
      this.setData({
        number: e.detail.value
      })
      console.log(e.detail.value)
    } else {
      wx.showToast({
        title: '请输入6-14位数字',
        icon: 'none',
        duration: 1500
      })
    }   

    if(this.data.loginNum && this.data.number){
      this.setData({
        isDisabled: false
      })
    }
  },
  //尝试解密自动获取微信内部手机号码
  getPhoneNumber(e){
    console.log(e)
    if(e.detail.iv){
      wx.login({
        success: res => {
          console.log(res.code);
          wx.request({
            url: 'http://localhost/wx/test.php',
            data: {
              'encryptedData': e.detail.encryptedData,
              'iv': e.detail.iv,
              'code': res.code
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function (res) {
              if (res.statusCode == 200) {
                //存入缓存
                wx.setStorageSync('phone', res.data.phone);
                this.setData({
                  number : res.data.phone
                })
              }
            },
            fail: function (err) {
              console.log(err);
              this.setData({
                isShow: true,
                autoShow: false
              })
            }
          })
        }
      })

    }else{
      this.setData({
        isShow: true,
        autoShow: false
      })
    }
  },
  //直接登录按钮逻辑控制
  login(e) {
    if (this.data.loginNum && this.data.number) {
      wx.setStorageSync("userNum", this.data.loginNum);
      var openId = getApp().globalData.userGlobleInfo.openId;
      this.setData({
        openId : openId
      })
      console.log(openId);
      wx.request({
        url: "http://localhost/wx/register.php" ,
        data:{
          loginNum : this.data.loginNum,
          number : this.data.number,
          nickName : this.data.nickName,
          openId   : openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('res')
          console.log(res);
          let result = res.data;
          // console.log(res.data);
          //result=1表示登录成功
          if (result == 1) {
            //跳转list主页面
            wx.switchTab({
              url: '/pages/menu/menu',
            })
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
    } else if (this.data.loginNum == undefined){
      wx.showToast({
        title: '请输入员工编号',
        icon: "none"
      })
    } else if (this.data.number == undefined){
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
    }else{
      wx.showToast({
        title: '请将信息填写完整后提交',
        icon: "none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      nickName : options.nickName
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