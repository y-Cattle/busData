// pages/day/day.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data:{},
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,
    monthOther: new Date().getMonth() + 1,
    day : new Date().getDate(),
    day_style: [],
    userNum: null,
    bcgColor: '#EDCFC9'
  },

  //自定义函数区域  {month:'current',day:1, color: 'white', background: 'rgba(0,0,0,0)'}
  changeAllDayBg() {
    const days_count = 31;
    let month = this.data.month;
    let monthOther = this.data.monthOther;
    let day_style = new Array;
    let day = this.data.day;
    for (let i = 1; i <= days_count; i++) {
      if( (i == day) && (month == monthOther)){
        day_style.push({
          month: 'current',
          day: i,
          color: 'black',
          background: 'rgba(122, 45, 45, 0.616)'
        })
      }else{
        day_style.push({
          month: 'current',
          day: i,
          color: 'white'
        });
      }
      
    }
    this.setData({
      day_style
    })
  },

  //发起网络请求
  getHttpRequest(){
    wx.request({
      url: 'http://localhost/wx/getDayData.php',
      data: {
        'num': this.data.userNum,
        'year': this.data.year,
        'month': this.data.month,
        'day': this.data.day
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
            title: '该用户当天数据为空',
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
            title: '未选择天数',
            icon: 'none',
            duration: 2000
          })
        } 
          else if (res.data == 2) {
          wx.showToast({
            title: '司机编号为空，请去输入编号',
            icon: 'none',
            duration: 2000
          })
        } 
          else if (res.data == 3) {
          wx.showToast({
            title: '未选择年份',
            icon: 'none',
            duration: 2000
          })
        } 
          else if (res.data == 4) {
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

  //点击选中日期
  dayClick(e){
    console.log(e.detail);
    let month = e.detail.month;
    let year = e.detail.year;
    let day = e.detail.day;
    let monthOther = this.data.monthOther;
    this.setData({
      month: month,
      year: year,
      day : day,
      monthOther : monthOther
    })
    this.changeAllDayBg();
    this.getHttpRequest();
   
  },
  next(e){
    console.log(e.detail);
    let monthOther = e.detail.currentMonth;
    this.setData({
      monthOther
    })
    this.changeAllDayBg();
    // console.log(this.data.monthOther);
  },
  prev(e){
    console.log(e.detail);
    let monthOther = e.detail.currentMonth;
    this.setData({
      monthOther
    })
    this.changeAllDayBg();
    // console.log(this.data.monthOther);
  },
  dateChange(e){
    console.log(e.detail);
    let monthOther = e.detail.currentMonth;
    this.setData({
      monthOther
    })
    this.changeAllDayBg();
    // console.log(this.data.monthOther);
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
  onLoad: function(options) {
    this.setNavigationBarColor();
    this.changeAllDayBg();
    let userNum = wx.getStorageSync('userNum');
    this.setData({
      userNum
    })
    this.getHttpRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})