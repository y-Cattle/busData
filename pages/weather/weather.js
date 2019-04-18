// pages/weather/weather.js

//获取应用实例
const app = getApp()
//调用百度地图天气API的js文件
var bmap = require('../../utils/bmap-wx.js');

Page({
  //“分享”功能
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '分享',
      path: '/pages/index',
      success: (res) => {
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res) => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    }
  },

  data: {
    currentWeather: {},
    inputCity: "",
    topNum: 0,
    scroll_height: 0,
    bcgImgList: [
      {
        src: '/images/weather/qing.jpg',
        topColor: '#0085e5'
      },
      {
        src: '/images/weather/yu.jpg',
        topColor: '#0e202c'
      },
      {
        src: '/images/weather/xue.jpg',
        topColor: '#0f0e1c'
      },
      {
        src: '/images/weather/yun.jpg',
        topColor: '#004092'
      },
      {
        src: '/images/weather/wu.jpg',
        topColor: '#d3ebf5'
      },
      {
        src: '/images/weather/yin.jpg',
        topColor: '#2d2225'
      },
      {
        src: '/images/weather/bg5.jpg',
        topColor: '#b8bab9'
      },
    ],
  },

  onLoad: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth
    });
    this.getWeather("");
  },

  //查询天气
  getWeather(cityName) {
    //提示“加载中”
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    });

    var that = this;

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'pmWBnvKC2KMxHiQ9GaAoWasXBiriaxLp'
    });

    //查询失败
    var fail = function (data) {
      //关闭加载提示框
      wx.hideLoading();

      var statusCode = data["statusCode"];
      //城市名称查询不到，弹窗提示
      if (statusCode == "No result available") {
        wx.showModal({
          title: '提示',
          content: '输入的城市名称有误，请重新输入',
          confirmText: '好的',
          confirmColor: '#ACB4E3',
          showCancel: false,
        });
      }
    };

    //查询成功
    var success = function (data) {
      //关闭加载提示框
      wx.hideLoading();
      console.log(data);

      if (data.originalData.status == 'success') {
        var msg = data.currentWeather[0]
        console.log(msg);
        //有currentData数据
        if (true) {
          if (msg.weatherDesc.indexOf('晴') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[0].src,
              bcgColor: that.data.bcgImgList[0].topColor,
            })
            that.setNavigationBarColor()
          } else if (msg.weatherDesc.indexOf('雨') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[1].src,
              bcgColor: that.data.bcgImgList[1].topColor,
            })
            that.setNavigationBarColor()
          } else if (msg.weatherDesc.indexOf('雪') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[2].src,
              bcgColor: that.data.bcgImgList[2].topColor,
            })
            that.setNavigationBarColor()
          } else if (msg.weatherDesc.indexOf('云') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[3].src,
              bcgColor: that.data.bcgImgList[3].topColor,
            })
            that.setNavigationBarColor()
          } else if (msg.weatherDesc.indexOf('雾') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[4].src,
              bcgColor: that.data.bcgImgList[4].topColor,
            })
            that.setNavigationBarColor()
          } else if (msg.weatherDesc.indexOf('阴') >= 0) {
            that.setData({
              bcgImg: that.data.bcgImgList[5].src,
              bcgColor: that.data.bcgImgList[5].topColor,
            })
            that.setNavigationBarColor()
          } else {
            that.setData({
              bcgImg: that.data.bcgImgList[6].src,
              bcgColor: that.data.bcgImgList[6].topColor,
            })
            that.setNavigationBarColor()
          }

        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
          })
        }
      }


      //获取当前的日期和星期几
      var currentDate = that.getDate().substring(5);
      var weekday = data.currentWeather[0].date.substring(0, 2);
      //currentDate = currentDate + "  " + weekday;


      //第1部分数据示例
      var currentWeather = data.currentWeather[0];

      //获得天气图标URL
      var iconURL = that.getIconURL(currentWeather.weatherDesc);

      //截取出实时温度数据
      var begin = currentWeather.date.indexOf("时");
      var end = currentWeather.date.indexOf(")");
      currentWeather.date = currentWeather.date.substring(begin + 2, end - 1);
      //console.log(currentWeather.date);

      //调整温度范围显示
      currentWeather.temperature = that.tempSwitch(currentWeather.temperature);

      //判断空气质量等级
      var pm25 = currentWeather.pm25;
      var airClass = "";
      var airColor = "";
      if (pm25 <= 50) {
        airClass = "优";
        airColor = "#00EE00";
      }
      else if (pm25 > 50 && pm25 <= 100) {
        airClass = "良";
        airColor = "#EEEE00";
      }
      else if (pm25 > 100 && pm25 <= 150) {
        airClass = "轻度污染";
        airColor = "#FF8C00";
      }
      else if (pm25 > 150 && pm25 <= 200) {
        airClass = "中度污染";
        airColor = "#FF3030";
      }
      else if (pm25 > 200 && pm25 <= 300) {
        airClass = "重度污染";
        airColor = "#E066FF";
      }
      else {
        airClass = "严重污染";
        airColor = "#8B0000";
      }

      //第2部分数据示例
      var tipsArray = new Array(5);
      tipsArray = data.originalData.results[0].index;
      var chuanyi = tipsArray[0];
      var xiche = tipsArray[1];
      var ganmao = tipsArray[2];
      var yundong = tipsArray[3];
      var ziwaixian = tipsArray[4];


      //未来3天的天气预报
      var forecastArray = new Array(4);
      forecastArray = data.originalData.results[0].weather_data;

      var forecast = new Array(3);
      for (var i = 0; i < 3; i++) {
        forecast[i] = forecastArray[i + 1];
        //调整日期显示
        forecast[i].date = that.getForecatDate(i, forecast[i].date);
        //获得天气图标URL
        forecast[i].iconURL = that.getIconURL(forecast[i].weather);
        //调整温度范围显示
        forecast[i].temperature = that.tempSwitch(forecast[i].temperature);
        //调整风向和风速显示，如果没有风速，则风速为空
        forecast[i].windDeriction = that.getWindDeriction(forecast[i].wind);
        forecast[i].windSpeed = that.getWindSpeed(forecast[i].wind);
      }

      //配置数据
      that.setData({
        iconURL: iconURL,
        currentWeather: currentWeather,
        currentDate: currentDate,
        weekday: weekday,
        airClass: airClass,
        airColor: airColor,
        forecast: forecast,
        ganmao: ganmao,
        yundong: yundong,
        ziwaixian: ziwaixian,
        xiche: xiche
      });
    }

    // 发起weather请求
    //cityName为空，查询定位城市天气
    if (!cityName) {
      BMap.weather({
        cityName: "",
        fail: fail,
        success: success
      });
    }
    //cityName不为空，查询输入城市天气
    else {
      BMap.weather({
        cityName: cityName,
        fail: fail,
        success: success
      });
    }
  },

  //设置
  setNavigationBarColor(color) {
    let bcgColor = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor,
    })
  },

  //日期显示
  getDate: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + "年" + month + "月" + strDate + "日";
    return currentdate;
  },

  //未来3天预报中调整日期显示
  getForecatDate: function (index, weekday) {
    var date = this.getNextDate(index + 1);
    var result;
    result = date + " " + weekday;
    return result;
  },

  getNextDate: function (index) {
    var today = new Date();
    //后index天的日期
    var nextDate = new Date(today.getTime() + 24 * 60 * 60 * 1000 * index);
    var month = nextDate.getMonth() + 1;
    var strDate = nextDate.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var result = month + "月" + strDate + "日";
    return result;
  },

  //转换温度范围显示格式，eg:"7 ~ -2℃"
  tempSwitch: function (temp) {
    var low;
    var high;
    var result;
    var flag = temp.indexOf("~");
    var length = temp.length;

    low = temp.substring(flag + 2, length - 1);
    high = temp.substring(0, flag - 1);
    result = low + " ~ " + high + "℃";

    return result;
  },

  //天气图标路径
  getIconURL: function (weatherDesc) {
    var condition = String(weatherDesc);
    var url = "";
    if (condition.includes("转")) {
      condition = condition.substring(0, condition.indexOf("转"));
    }

    if (condition.includes("晴")) {
      url = "../../images/weather/sunny.png";
    }
    else if (condition.includes("多云")) {
      url = "../../images/weather/partly_cloudy.png";
    }
    else if (condition.includes("阴")) {
      url = "../../images/weather/cloudy.png";
    }
    else if (condition.includes("阵雨")) {
      url = "../../images/weather/shower.png";
    }
    else if (condition.includes("雷阵雨")) {
      url = "../../images/weather/stormy_rain.png";
    }
    else if (condition.includes("雨夹雪")) {
      url = "../../images/weather/snow_rain.png";
    }
    else if (condition.includes("小雨")) {
      url = "../../images/weather/light_rain.png";
    }
    else if (condition.includes("中雨")) {
      url = "../../images/weather/moderate_rain.png";
    }
    else if (condition.includes("大雨")) {
      url = "../../images/weather/heavy_rain.png";
    }
    else if (condition.includes("暴雨")) {
      url = "../../images/weather/rainstorm.png";
    }
    else if (condition.includes("阵雪")) {
      url = "../../images/weather/shower_snow.png";
    }
    else if (condition.includes("小雪")) {
      url = "../../images/weather/light_snow.png";
    }
    else if (condition.includes("中雪")) {
      url = "../../images/weather/moderate_snow.png";
    }
    else if (condition.includes("大雪")) {
      url = "../../images/weather/heavy_snow.png";
    }
    else if (condition.includes("暴雪")) {
      url = "../../images/weather/snow_storm.png";
    }
    else if (condition.includes("雾")) {
      url = "../../images/weather/fog.png";
    }
    else if (condition.includes("霾")) {
      url = "../../images/weather/haze.png";
    }
    else if (condition.includes("沙尘暴")) {
      url = "../../images/weather/dust_storm.png";
    }
    else {
      url = "../../images/weather/unknown.png";
    }
    return url;
  },

  //获得风向
  getWindDeriction: function (wind) {
    var result = "";
    var index = this.seperateWind(wind);
    //信息中不包含风速，风向为全部信息
    if (index == -1) {
      result = wind;
    }
    //信息中包含风速，截取出风向
    else {
      result = wind.substring(0, index);
    }
    return result;
  },

  //获得风速
  getWindSpeed: function (wind) {
    var result = "";
    var index = this.seperateWind(wind);
    //信息中不包含风速，风速为空
    if (index == -1) {
      result = "";
    }
    //信息中包含风速，截取出风速
    else {
      result = wind.substring(index, wind.length);
    }
    return result;
  },

  //将风向和风力分开，获得分隔的索引值
  seperateWind: function (wind) {
    var numPattern = /[0-9]/;
    var result = "";
    if (numPattern.test(wind)) {
      //风力信息中包含数字
      var pattern = new RegExp("[0-9]+");
      var res = wind.match(pattern);
      result = res.index;
    }
    else if (wind.search("微风")) {
      var res = wind.match("微风");
      result = res.index;
    }
    else {
      //风力信息中不包含数字
      result = -1;
    }
    return result;
  },

  //获得输入框中的文字
  commitSearch(res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },
  // 清除输入框内文字
  clearInput() {
    this.setData({
      inputCity: '',
    })
  },
  //查询按钮
  search(data) {
    if (data == '') {
      wx.showModal({
        title: '提示',
        content: '请先输入要查询的城市名称',
        confirmText: '好的',
        confirmColor: '#ACB4E3',
        showCancel: false,
      });
    }
    else {
      //查询天气
      this.getWeather(data);
      this.clearInput();

    }
  }

})
