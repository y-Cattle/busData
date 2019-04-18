// pages/month/month.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNum: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    datePickerIsShow: false,
    bcgColor: '#79bbd9'
  },


  showDatePicker: function (e) {
    console.log(e);
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    let year = e.detail.value[0];
    let month = e.detail.value[1];
    this.setData({
      year: year,
      month: month,
      datePickerIsShow: false,
    });
    this.getHttpRequest();
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
  prevMonth() {
    let month = this.data.month;
    month = month - 1;
    this.setData({
      month
    })
    if (month <= 0) {
      let year = this.data.year - 1;
      month = 12;
      this.setData({
        year,
        month
      })
    }
    this.getHttpRequest();
  },
  nextMonth() {
    let month = this.data.month;
    month = month + 1;
    this.setData({
      month
    })
    if (month > 12) {
      let year = this.data.year + 1;
      month = 1;
      this.setData({
        year,
        month
      })
    }
    this.getHttpRequest();
  },
  getHttpRequest() {
    wx.request({
      url: 'http://localhost/wx/getMonthData.php',
      data: {
        'num': this.data.userNum,
        'year': this.data.year,
        'month': this.data.month,
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log("res");
        console.log(res.data);
        if (res.data.user[0] == null) {
          // console.log('空');
          wx.showToast({
            title: '该用户当月数据为空',
            icon: 'none',
            duration: 2000
          })

        }
        else if (res.data.user[0] != null) {
          this.setData({
            list_data: res.data.user
          })
        }
        else if (res.data == 1) {
          wx.showToast({
            title: '司机编号为空，请去输入编号',
            icon: 'none',
            duration: 2000
          })
        }
        else if (res.data == 2) {
          wx.showToast({
            title: '未选择年份',
            icon: 'none',
            duration: 2000
          })
        }
        else if (res.data == 3) {
          wx.showToast({
            title: '未选择月份',
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
  },
  //设置背景
  setNavigationBarColor(color) {
    let bcgColor = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.year); 
    // console.log(this.data.month);
    let userNum = wx.getStorageSync('userNum');
    // console.log(userNum);
    this.setData({
      userNum
    });
    this.getHttpRequest();
    this.setNavigationBarColor();
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

  },





})