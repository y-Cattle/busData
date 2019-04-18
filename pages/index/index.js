// pages/indexx/index.js

const app = getApp();
// app.globalData.userGlobleInfo = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    angle: 0,
    remind: '加载中',
    isShow: true,
    show: false
  },

  handleClick(){
    console.log('openId')
    console.log(this.data.userInfo.openId)
    let openId = this.data.userInfo.openId;
    wx.request({
      url: 'http://localhost/wx/judge.php',
      data:{
        nickName: this.data.userInfo.nickName,
        openId : openId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        console.log('wx');
        console.log(res);

        if(res.data.num && res.data.num != null){
          wx.setStorage({
            key: "loginNum",
            data: res.data.num.loginNum
          })
          // console.log(this.userInfo.avatarUrl)
          wx.setStorage({
            key: "userAvatar",
            data: this.data.userInfo.avatarUrl
          })
          wx.setStorage({
            key: 'nickName',
            data: this.data.userInfo.nickName
          })
          wx.switchTab({
            url: '/pages/menu/menu',
          })
        }else{
          wx.setStorage({
            key: 'nickName',
            data: this.data.userInfo.nickName
          })
          wx.redirectTo({
            url: '/pages/login/login?nickName=' + this.data.userInfo.nickName
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  getUserInfo(){
    //判断是否授权过用户信息获取
    wx.getSetting({
      success: (data) => {
        console.log('getSte'+data);
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false,
            show: true //已授权，授权按钮不显示
          });
        } else {
          this.setData({
            isShow: true //未授权
          })
         
        }
      }
    })    
    //获取用户信息
    wx.login({
      success: (r) => {
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: (res) => {
              console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
              //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'http://localhost/wx/test.php',//自己的服务接口地址
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { 'encryptedData': res.encryptedData, 'iv': res.iv, 'code': code },
                success: (data) => {
                  console.log(data)
                  //4.解密成功后 获取自己服务器返回的结果
                  if (data.statusCode == 200) {
                    let userInfo = data.data;
                    console.log(userInfo);
                    this.setData({
                      userInfo: userInfo
                    });
                    let app = getApp();
                    app.globalData.userGlobleInfo = userInfo;
                
                  } else {
                    console.log('解密失败')
                  }

                },
                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    }) 
  },
  
  handleGetUserInfo(data){
    console.log("点击");
    if(data.detail.rawData){//点击为允许获取信息
      wx.showLoading({
        title: '正在登录...',
        mask: true
      });
      this.getUserInfo();
      setTimeout(
        function () {
          wx.hideLoading();
        }, 1000
      );
    }else{
      wx.showToast({
        title: '你已拒绝授权，请授权再使用',
        icon: 'none'
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
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