// component/animationMenu/animationMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    bcgImgAreaShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareAppMessage(res) {
      let shareInfo = this.data.shareInfo
      return {
        title: shareInfo.title || 'bus',
        path: shareInfo.path || '/pages/index/index',
        imageUrl: '../../images/animationMenu/share_circle.png',
      }
    },
    menuHide() {
      if (this.data.hasPopped) {
        this.takeback()
        this.setData({
          hasPopped: false,
        })
      }
    },
    menuMain() {
      if (!this.data.hasPopped) {
        this.popp()
        this.setData({
          hasPopped: true,
        })
      } else {
        this.takeback()
        this.setData({
          hasPopped: false,
        })
      }
    },
    menuToCitychoose() {
      this.menuMain()
      wx.navigateTo({
        url: '/pages/citychoose/citychoose',
      })
    },
    menuToSetting() {
      this.menuMain()
      wx.switchTab({
        url: '/pages/myMenu/myMenu',
      })
    },
    menuToAbout() {
      this.menuMain()
      wx.switchTab({
        url: '/pages/menu/menu',
      })
    },
    popp() {
      let animationMain = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationOne = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationTwo = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationFour = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      animationMain.rotateZ(180).step()
      animationOne.translate(-30, -45).rotateZ(180).opacity(1).step()
      animationTwo.translate(-75, 0).rotateZ(180).opacity(1).step()
      animationFour.translate(-30, 45).rotateZ(0).opacity(1).step()
      this.setData({
        animationMain: animationMain.export(),
        animationOne: animationOne.export(),
        animationTwo: animationTwo.export(),
        animationFour: animationFour.export(),
      })
    },
    takeback() {
      let animationMain = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationOne = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationTwo = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      let animationFour = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out'
      })
      animationMain.rotateZ(0).step();
      animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
      animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
      animationFour.translate(0, 0).rotateZ(0).opacity(0).step()
      this.setData({
        animationMain: animationMain.export(),
        animationOne: animationOne.export(),
        animationTwo: animationTwo.export(),
        animationFour: animationFour.export(),
      })
    }
  }
})
