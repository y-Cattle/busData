// component/rotation/rotation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {nowIdx: 0,
    imgUrls: [
      '../../images/rotationBg/rotation2.jpg',
      '../../images/rotationBg/rotation1.jpg',
      '../../images/rotationBg/rotation3.jpg',
      '../../images/rotationBg/rotation4.jpg',
      '../../images/rotationBg/rotation5.jpg'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //swiper滑动事件
    swiperChange: function (e) {
      this.setData({
        nowIdx: e.detail.current
      })
    },
  }
})
