  // pages/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data:[],
    userAvatar: null,
    loginNum:null,
    nickName:'',
    uerNum:null,
    flag: true,
    dataNum: null,
    showLoading:true
  },

  //自定义事件
  toDetail(event){
    console.log(event);
    let index = parseInt(event.currentTarget.dataset.index);
    let listData = JSON.stringify(this.data.list_data);
    wx.navigateTo({
      url: '../../pages/detail0/detail0?index=' + index +'&listData=' + listData,
      success: function (res) {
        // console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getData(){
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

            if (userNum) {
              let userAvatar = app.globalData.userGlobleInfo.avatarUrl;
              this.setData({
                userAvatar: userAvatar
              })
              wx.request({
                url: 'http://localhost/wx/sqlCon.php',
                data: {
                  'num': userNum,
                  'avatar': userAvatar,
                  'dataNum': this.data.dataNum
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
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

  bottomGetInfo(){
    let dataNum = this.data.dataNum + 12;
    let index = dataNum - 11;
    this.setData({
      dataNum: dataNum
    })
    wx.request({
      url: 'http://localhost/wx/sqlCon.php',
      data: {
        'num': this.data.userNum,
        'avatar': this.data.userAvatar,
        'dataNum': dataNum
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res.data);
        if (res.data.user[index]) {
          this.setData({
            list_data: res.data.user
          })
        } else {
          wx.showToast({
            title: '加载错误,没有更多数据',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            showLoading:false
          })
        }
        // console.log(this.data)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.data.dataNum = 12;
    this.getData();



    // wx.getStorage({
    //   key: 'loginNum',
    //   success: (res) =>{
    //     console.log('onload:loginNum')
    //     console.log(res.data)
    //       this.setData({
    //         loginNum: res.data
    //       })
      
    //     wx.getStorage({
    //       key: 'userAvatar',
    //       success:(obj)=>{
    //         this.setData({
    //           userAvatar: obj.data
    //         })
    //         wx.request({
    //           url: 'http://localhost/wx/sqlCon.php',
    //           data: {
    //             'num': res.data,
    //             'avatar': obj.data,
    //             'dataNum': this.data.dataNum
    //           },
    //           method: 'post',
    //           header: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //           },
    //           success: (res) => {
    //             console.log(res.data);
    //             if (res.data.user[1]){
    //               this.setData({
    //                 list_data: res.data.user,
    //                 flag: false
    //               })
    //             }else{
    //               wx.showToast({
    //                 title: '请输入正确编号',
    //                 icon: 'none',
    //                 duration: 2000
    //               })
    //             }
    //             // console.log(this.data)
    //           },
    //           fail:(res) => {
    //             console.log(res)
    //           }
    //         })
    //       }
    //     })
       
    //   }
    // })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log('onready')
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log('onshow')
    console.log(options)
    console.log(app.globalData.userGlobleInfo)
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(
      function () {
        wx.hideLoading();
      }, 1000
    )
   
    

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
      // console.log("我执行了");
      setTimeout(() => {
        this.bottomGetInfo();
      }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})