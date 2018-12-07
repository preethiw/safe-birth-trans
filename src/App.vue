<template>
   <div id="app" :class="[{slide: isSlide}, languageClass]">
      <localizer>
         <!--<link rel="shortcut icon" type="image/png" href="../assets/images/favicon.png"/>-->
         <!-- <div class="app__overlay" ref="overlay"></div> -->
         <loading-component></loading-component>
         <navigation-component></navigation-component>
         <!-- <full-menu-component></full-menu-component> -->
         <!-- <transition v-on:after-enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in"> -->
         <transition name="fade" mode="out-in">
            <router-view></router-view>
         </transition>
         <div class="landscape-warning">
            <img src="./assets/images/landscape.svg"/>
            <span>Please rotate your device to portrait view to continue browsing.</span>
         </div>
         <popup-component v-bind:openedClass="$root.counterPopup" v-on:close="closePopup" class="popup-counter">
            <popup-counter-component></popup-counter-component>
         </popup-component>
      </localizer>
   </div>
</template>

<script>
import LoadingComponent from './components/Loading.vue'
import NavigationComponent from './components/Navigation.vue'
import FullMenuComponent from './components/FullMenu.vue'
import PopupComponent from './components/Popup.vue'
import PopupCounterComponent from './components/PopupCounter.vue'
import Navbar from './components/Navbar'
import Localizer from './components/Localizer'

import { TweenMax, Linear } from 'gsap'
import 'ScrollTo'

const axios = require('axios')

var keys = {37: 1, 38: 1, 39: 1, 40: 1}

export default {
  name: 'App',
  data () {
    return {
      interval: null,
      lastDelta: -1,
      firstTouch: -1,
      canScroll: false,
      startTime: null,
      startScroll: null,
      onBottom: false,
      onTop: false,
      lastScroll: 0,
      mobileAddressHeight: 56,
      waitForScrollEvent: null
    }
  },
  computed: {
    isSlide: function () {
      if (this.$route.name === 'Home' ||
          this.$route.name === 'Map' ||
          this.$route.name === 'Closing') {
        return true
      } else {
        return false
      }
    },
    languageClass:function(){
      return this.$route.params.locale
    }
  },
  methods: {
    isMobile: function () {
      if (window.outerWidth <= 768) {
        this.$root.isMobile = true
      } else {
        this.$root.isMobile = false
      }

      if (window.outerWidth <= 1024) {
        this.$root.isTablet = true
      } else {
        this.$root.isTablet = false
      }
    },
    isIntro: function () {
      this.$root.isIntro = this.$route.name === 'Home'
    },
    counter: function () {
      if (this.$root.counter <= 0) {
        clearInterval(this.interval)
        this.$root.counter = 120
        this.$root.women++
      } else {
        this.$root.counter--
      }
    },
    httpGet: function (theUrl) {
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open('GET', theUrl, false)
      xmlHttp.send(null)
      return xmlHttp.responseText
    },
    preventDefaultForScrollKeys: function (e) {
      if (keys[e.keyCode]) {
        if (!this.canScroll || this.$root.menuOpened || this.$root.counterPopup || this.$root.popupOpened) return false

        if (this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia') {
          var delta = -200
          if (e.keyCode === 37 || e.keyCode === 38) {
            delta = 200
          }
          this.scroll(delta, 1000)
        } else {
          if (e.keyCode === 37 || e.keyCode === 38) {
            this.$emit('slide', 'prev')
          } else {
            this.$emit('slide', 'next')
          }
          return false
        }
      }
    },
    touchStart: function (e) {
      /* if(this.$root.popupOpened){
        document.querySelector('html').classList.add('overflow-hidden');
      } else {
        document.querySelector('html').classList.remove('overflow-hidden');
      } */

      this.firstTouch = e.touches[0].pageY
    },
    touchMove: function (e) {
      if ((this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia') && this.$root.isMobile) {
        this.toggleHeader()
      }
      this.lastDelta = e.touches[0].pageY
    },
    toggleHeader () {
      var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
      // console.log(scrollTop, this.lasScroll, this.firstTouch)
      if (scrollTop > 20 && (this.lasScroll < scrollTop || this.lasScroll === undefined || this.firstTouch < scrollTop)) {
        document.querySelector('#app').classList.add('hide-header')
      } else {
        document.querySelector('#app').classList.remove('hide-header')
      }
    },
    touchEnd: function (e) {
      if (this.$root.popupOpened) {
        return false
      }
      var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
      if (this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia' || (this.$route.name === 'Action' && this.$root.isMobile)) {
        if (this.$root.isMobile && this.$route.name !== 'Action') {
          this.toggleHeader()
          var s = this
          setTimeout(function () {
            s.toggleHeader()
          }, 1000)
        }
        if (this.lastDelta !== -1 && !this.$root.menuOpened) {
          var body = document.body
          var html = document.documentElement
          var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight

          if (scrollTop <= 0) {
            this.prevPage()
          } else if (scrollTop >= (height - (this.$root.testBrowser('firefox mobile') ? 56 : 0))) {
            this.nextPage()
          }
        }
        this.lasScroll = scrollTop
      } else {
        if (!this.canScroll || this.$root.menuOpened || this.$root.counterPopup || this.$root.popupOpened || this.lastDelta < 0) return false

        if (this.firstTouch > this.lastDelta) {
          this.$emit('slide', 'next')
        } else {
          this.$emit('slide', 'prev')
        }
        // this.lastDelta = delta
      }
      this.lastDelta = -1
    },
    preventDefault: function (e) {
      e.preventDefault()

      var deltaTime = new Date().getTime() - this.startTime
      this.startTime = new Date().getTime()
      var delta = e.wheelDelta || -e.deltaY
      if (this.$root.testBrowser('firefox') && e.deltaMode === 1) {
        if (delta < 0) {
          if (delta > -180) delta = -180
        } else {
          if (delta < 180) delta = 180
        }
      } else if (this.$root.testBrowser('firefox')) {
        delta += delta * 1.50
      }
      /* if(Math.abs(delta) < 100)
        delta *= 120; */
      // console.log(delta);
      // var scrollHelp = Math.abs(delta)/deltaTime

      if (!this.canScroll || this.$root.menuOpened || this.$root.counterPopup || this.$root.popupOpened) return false

      if (this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia' || (this.$route.name === 'Action' && this.$root.isMobile)) {
        // var delta = e.originalEvent.wheelDelta/120 || -e.originalEvent.detail/3;
        this.scroll(delta, deltaTime, e)
      } else if (deltaTime > 200) {
        if (delta < 0) {
          this.$emit('slide', 'next')
        } else {
          this.$emit('slide', 'prev')
        }
      }
    },
    scroll: function (delta, deltaTime, e) {
      var limit = window.innerHeight / 5

      /* if(delta > -100) // is firefox
        delta += -155; */

      // if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && e.deltaMode==1){
      if (delta < 0) {
        this.onTop = false
        if (delta < -limit) delta = -limit
      } else {
        this.onBottom = false
        if (delta > limit) delta = limit
      }
      // }

      var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
      var finalScroll = scrollTop - parseInt(delta)

      var body = document.body
      var html = document.documentElement
      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight
      if (this.$root.isMobile && (this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia')) {
        this.toggleHeader()
      }
      // console.log(scrollTop, height, deltaTime, delta, this.lastDelta)

      if (scrollTop <= 0 && delta > 0) {
        if (deltaTime > (this.onTop ? (this.$root.testBrowser('safari') ? 25 : 30) : 60)) {
          this.prevPage()
          this.onTop = false
          this.onBottom = false
        } else {
          this.onTop = true
        }
      } else if (scrollTop >= height && delta < 0) {
        if (deltaTime > (this.onBottom ? (this.$root.testBrowser('safari') ? 30 : 40) : 60)) {
          this.nextPage()
          this.onBottom = false
          this.onTop = false
        } else {
          this.onBottom = true
        }
      }
      TweenMax.to(window, 0.2, {
        scrollTo: { y: finalScroll, autoKill: true },
        ease: Linear.easeNone,
        overwrite: 5
      })
      this.lastDelta = delta
    },
    closePopup: function () {
      this.$root.counterPopup = false
    },
    nextPage: function () {
      document.querySelector('#app').classList.remove('hide-header')
      if (this.$route.path.toLowerCase() === '/action') return false
      var current = this.$root.menuOrder.indexOf(this.$route.path.toLowerCase())
      if (current < this.$root.menuOrder.length) {
        var next = this.$root.menuOrder[current + 1]
        this.canScroll = false
        this.$router.push(next)
      }
    },
    prevPage: function () {
      document.querySelector('#app').classList.remove('hide-header')

      if (this.$route.path.toLowerCase() === '/action') {
        this.$root.historyBack = true
        this.canScroll = false
        this.$router.push('/closing')
      } else {
        var current = this.$root.menuOrder.indexOf(this.$route.path.toLowerCase())
        if (current > 0) {
          var prev = this.$root.menuOrder[current - 1]
          this.$root.historyBack = true
          this.canScroll = false
          this.$router.push(prev)
        }
      }
    },
    // enter: function () {
    //   this.$nextTick(function () {
    //     TweenMax.fromTo(this.$refs.overlay, 0.7, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', ease: Power2.easeOut})
    //   })
    // },
    // beforeLeave: function () {
    //   TweenMax.to(this.$refs.overlay, 0.01, {opacity: 1, scaleX: 0, display: 'block', ease: Power2.easeOut})
    // },
    // leave: function (el, done) {
    //   TweenMax.fromTo(this.$refs.overlay, 0.5, {scaleX: 0}, {scaleX: 1, ease: Power2.easeOut})
    //   setTimeout(function() {
    //     done()
    //   }, 1000);
    // },
    initData: async function () {
      var that = this
      /* var location = {"as":"AS14907 Wikimedia Foundation, Inc.","city":"San Francisco (South Beach)","country":"United States","countryCode":"US","isp":"Wikimedia Foundation, Inc.","lat":37.787,"lon":-122.4,"org":"Wikimedia Foundation, Inc.","query":"208.80.152.201","region":"","regionName":"California","status":"success","timezone":"America/Los_Angeles","zip":"94105"};

      var iso = require('./assets/data/iso.json')
      var data = require('./assets/data/data.json')

      var stories = ['HTI', 'LBR']
      var selectedStory = Math.round(Math.random() * 1)
      var storyCountry = stories[selectedStory]
      that.$root.dataStory = {name: data[storyCountry].name, number: data[storyCountry].number}

      var country3 = 'GRC'
      if (location !== undefined) {
        if (location.status === 'success') {
          that.$root.userLocation = location
          country3 = iso[that.$root.userLocation.countryCode].code_un
        }
      }

      if (data[country3] === undefined) {
        country3 = 'GRC'
        that.$root.userLocation = null
      } else {
        if (!data[country3].compare) {
          country3 = 'GRC'
          that.$root.userLocation = null
        }
      }

      that.$root.dataUser = {name: data[country3].name, number: data[country3].number}

      if (that.$route.name !== 'Home') {
        if (that.$root.women === null) {
          that.$root.women = 0
        }
      }

      that.orderMenu() */
      // await axios.get('http://ip-api.com/json/208.80.152.201').then(function (response) {
      var corsURL = window.location.origin + '/sites/all/themes/unfpa_global'

      await axios.get(corsURL + '/getLocation.php').then(function (response) {
        var location = response.data

        var iso = require('./assets/data/iso.json')
        var data = require('./assets/data/data.json')

        var country3 = 'GRC'
        if (location !== undefined) {
          if (location.status === 'success') {
            that.$root.userLocation = location
            country3 = iso[that.$root.userLocation.countryCode].code_un
          }
        }

        if (data[country3] === undefined) {
          country3 = 'GRC'
          that.$root.userLocation = null
        } else {
          if (!data[country3].compare) {
            country3 = 'GRC'
            that.$root.userLocation = null
          }
        }

        that.setCountries(country3)
      }, function (error) {
        if (error) {
          console.log(error)
        }

        var country3 = 'GRC'
        that.setCountries(country3)
      })
    },
    setCountries: function (country3) {
      // var iso = require('./assets/data/iso.json')
      var data = require('./assets/data/data.json')

      var stories = ['HTI', 'LBR']
      var selectedStory = Math.round(Math.random() * 1)
      var storyCountry = stories[selectedStory]
      this.$root.dataStory = {name: data[storyCountry].name, number: data[storyCountry].number}

      this.$root.dataUser = {name: data[country3].name, number: data[country3].number}

      if (this.$route.name !== 'Home') {
        if (this.$root.women === null) {
          this.$root.women = 0
        }
      }

      this.orderMenu()
    },
    orderMenu: function () {
      this.$root.menuOrder = ['/', '/map']

      if (this.$root.dataStory.name === 'Liberia') {
        this.$root.menuOrder.push('/liberia', '/haiti', '/kenya')
      } else if (this.$root.dataStory.name === 'Haiti') {
        this.$root.menuOrder.push('/haiti', '/liberia', '/kenya')
      } else if (this.$root.dataStory.name === 'Kenya') {
        this.$root.menuOrder.push('/kenya', '/liberia', '/haiti')
      }

      this.$root.menuOrder.push('/closing')
    }

  },
  watch: {
    '$root.women': function () {
      var that = this
      this.interval = setInterval(that.counter, 1000)
    },
    '$route': function () {
      // console.log(this.$route.name)
      this.$root.menuOpened = false
      this.canScroll = false
      var that = this
      setTimeout(function () {
        that.canScroll = true
      }, 1000)

      if (that.$route.name !== 'Home') {
        this.$root.isIntro = false
        if (that.$root.women === null) {
          that.$root.women = 0
        }
      }
    },
    '$root.isIntro': function () {
    },
    '$root.loading': function () {
      this.canScroll = true
    }
  },
  created () {
    this.isMobile()
    this.initData()
    this.isIntro()
    // this.$root.isIntro = this.$route.name === 'Home';

    window.onresize = this.isMobile
  },
  mounted () {
    if (window.addEventListener) window.addEventListener('DOMMouseScroll', this.preventDefault, {passive: true})
    window.onwheel = this.preventDefault // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault // older browsers, IE
    document.onkeydown = this.preventDefaultForScrollKeys
    window.addEventListener('touchmove', this.touchMove, {passive: true})
    window.addEventListener('touchstart', this.touchStart, {passive: true})
    window.addEventListener('touchend', this.touchEnd, {passive: true})
    this.isMobile()

    if (this.$route.name === 'Kenya' || this.$route.name === 'Haiti' || this.$route.name === 'Liberia') {
      this.canScroll = true
    }
  },
  components: {
    LoadingComponent,
    FullMenuComponent,
    NavigationComponent,
    PopupComponent,
    PopupCounterComponent,
    Localizer,
    navbar: Navbar,
  }
}
</script>

<style scoped>
    .app-wrapper {
        margin-top: 85px;
    }
</style>

<style lang="scss">
@import "assets/styles/reset.scss";
@import "assets/styles/fonts.scss";
@import "assets/styles/grid.scss";

html{
  height: 100%;
  -webkit-font-smoothing: antialiased !important;
    font-smooth: always;
    text-shadow: 0px 0px 1px transparent;
}
.show-mobile{
  display: none;
}
.landscape-warning{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  background-color: black;
  img, span{
    display: block;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.5s ease-in-out;
  }
  img{
    width: em(60);
    height: em(60);
    margin-bottom: 20px;
  }
  span{
    font-family: Muli-Regular;
    font-size: em(14);
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: em(20, 14);
    max-width: em(230, 14);
    transition-delay: 0.2s;
  }
}
#app{
  .main-nav > :not(.main-nav__logo), #safeBirthText, .subway-menu, .opening + .scroll-default {
    transition: opacity 0.5s ease-in-out;
  }
  &.hide-nav{
    .main-nav > :not(.main-nav__logo), #safeBirthText, .subway-menu, .opening + .scroll-default {
      opacity: 0;
      pointer-events: none;
    }
  }
}

@media screen and (max-width: $mobile_breakpoint) {
  /*html{
    width: 100%;
    overflow: hidden;
  }
  body{
    width: 100%;
    position: relative;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
  }*/
  .show-mobile{
    display: block;
  }
  body, html {
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /*position: fixed;
    right: 0;
    bottom: 0;
    overflow: hidden;*/
  }
  html.overflow-hidden{
    &, body{
      overflow: hidden;
    }
  }
  /*.scrolleable{
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute
  }*/

  #app{
    &.slide{
      width: 100%;
      height: 100%;
      position: fixed;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    &.hide-header{
      .main-nav, .subway-menu .toggle-btn{
        transform: translateY(-20px);
        opacity: 0;
        pointer-events: none;
      }
    }
  }
}
@media (max-width: 800px) and (orientation: landscape) {
  #app:not(.keyboard-openned) .landscape-warning{
    pointer-events: unset;
    opacity: 1;
    img, span{
      opacity: 1;
      transform: translateY(0px);
    }
  }
}
body{
  height: 100%;
  margin: 0;
  color: $color_body;
  font-family: $font_base;
  overscroll-behavior: contain;
}

input, textarea, select, button{
  font-family: $font_base;
}

*{
  outline: none !important;
}

.app__overlay{
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color_body;
  transform-origin: left center;
  transform: scale(0, 1);
}

.title-h1{
  font-family: $font_title;
  font-size: em(144);
  line-height: 0.7em;
  margin: 0;

  &:after{
    content: "";
    display: block;
    border-top: em(8, 144) solid currentColor;
  }

  @media screen and (max-width: $mobile_breakpoint) {
    font-size: em(30);
  }
}

.title-h2{
  font-family: $font_title;
  font-size: em(80);
  line-height: em(90, 80);
  margin: 0;

  span{
    display: inline-block;
  }

  @media screen and (max-width: $mobile_breakpoint) {
    font-size: em(30);
  }
}

.title-h3{
  font-family: $font_title;
  font-size: em(100);
  line-height: em(120, 100);
  letter-spacing: em(-0.4, 100);

  @media screen and (max-width: $mobile_breakpoint) {
    font-size: em(20);
  }
}

.title-h4{
  font-family: $font_title;
  font-size: em(50);
  line-height: em(60, 50);

  @media screen and (max-width: $mobile_breakpoint) {
    font-size: em(22);
  }
}

.fr {
  .title-h4 {
     font-size: em(42);
     @media screen and (max-width: $mobile_breakpoint) {
        font-size: em(22);
     }
  }
}

.es {
  .title-h4 {
     font-size: em(46);
     @media screen and (max-width: $mobile_breakpoint) {
        font-size: em(22);
     }
  }
}

.fr,
.es {
  .blockquote-default{
    &__text{
       font-size: em(90);
    }
  }
}

.blockquote-default{
  padding: 0 em(60);

  &__text{
    font-family: $font_title;
    font-size: em(100);
    line-height: em(80, 100);
    letter-spacing: em(-0.8, 100);
    margin: 0;
    position: relative;

    &:before{
      content: '“';
    }

    &:after{
      content: '”'
    }

    &:before{
      position: absolute;
      transform: translateX(-100%);
    }
  }

  &__cite{
    /*width: 70%;*/
    font-size: em(14);
    line-height: em(20, 14);
    margin: em(30, 14) 0 0;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    padding: 0 em(20);

    &__text{
      font-size: em(20);
      line-height: em(30, 20);
    }

    &__cite{
      width: 90%;
      font-size: em(12);
      margin: em(5, 12) 0;
    }
  }
}

p{
  font-size: em(15);
  line-height: em(29, 15);
  letter-spacing: em(-0.08, 15);
  margin: em(25, 15) 0;
}

p.lead{
  font-size: em(24);
  line-height: em(45, 24);
  letter-spacing: 0;

  @media screen and (max-width: $mobile-breakpoint) {
    font-size: em(14);
  }
}

strong{
  font-weight: bold;
}

em{
  font-style: italic;
}

a{
  color: $color1;
}

.primary-color{
  color: $color1;
}

.clearfix{
  clear: both;
}

.btn{
  display: inline-block;
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: none;
  cursor: pointer;

  &--default, &--primary{
    color: $color_body;
    font-size: em(18);
    font-family: $font_title;
    padding: em(22, 18);
    width: 100%;
    box-sizing: border-box;
    border: 1px solid currentColor;
    border-radius: em(30, 18);
    text-align: center;
  }

  &--primary{
    color: #FFF;
    background-color: $color_body;
    border-color: $color_body;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &--default, &--primary{
      font-size: em(12);
    }
  }
}

.link-default{
  display: inline-block;
  text-decoration: none;

  &:after{
    content: "";
    display: block;
    border-bottom: 1px solid currentColor;
    transform: scale(0, 1);
    transition: transform 0.3s ease-in-out;
  }

  &:hover{
    &:after{
      transform: scale(1, 1);
    }
  }
}

.credits{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;

  p{
    margin: 0;
    font-size: em(10);
    opacity: 0.35;
  }

  img{
    width: auto;
    height: em(18);
    margin: 0 em(15);
    opacity: 0.35;
  }
}

.scroll-default{
  position: fixed;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  @media screen and (max-width: $mobile-breakpoint) {
    //left: calc(50% - 15px);
    bottom: em(90);
  }
  @media screen and (max-width: $mobile-breakpoint) and (max-height: 670px) {
    bottom: 40px;
  }
}

.btn-circles{
  cursor: pointer;
  display: block;
  font-size: em(8);
  width: em(60, 8);
  height: em(60, 8);
  margin: 0 auto;
  border-radius: 50%;
  color: #0C1020;
  border: 1px solid #EAEAEC;
  position: relative;
  text-decoration: none;
  font-family: $font_title;

  &:before, &:after{
    content: "";
    display: block;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 100%;
    height: 100%;
    border: 1px solid currentColor;
    border-radius: 50%;
    transform-origin: center;
  }

  &:before{
    transform: scale(1.3);
    opacity: 0.2;
    animation: circle1 1.5s ease-out infinite;
  }

  &:after{
    transform: scale(1.6);
    opacity: 0.05;
    animation: circle2 1.5s ease-out 0.1s infinite;
  }

  &__content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    box-sizing: border-box;
  }

  svg{
    position: absolute;
    top: -2.5%;
    left: -2.5%;
    width: 105%;
    height: 105%;
    stroke-width: 1px;
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 0.7s ease-in-out;
  }

  &:hover{
    svg{
      stroke-dashoffset: 0;
    }
  }
}

@keyframes circle1 {
  0% {
    transform: scale(1.2);
    opacity: 0;
  }
  30% {
    transform: scale(1.3);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes circle2 {
  0% {
    transform: scale(1.4);
    opacity: 0;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.05;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.float-left{
  float: left;
}

.float-right{
  float: right;
}

.max-width{
  max-width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fadescroll-enter-active, .fadescroll-leave-active {
  transition: opacity .5s;
}
.fadescroll-enter, .fadescroll-leave-to{
  opacity: 0;
}

.fadescroll-enter-active{
  transition-delay: 1.5s;
}
.carousel-default{
  .flickity-prev-next-button{
    font-size: em(24);
    position: absolute;
    z-index: 10;
    width: 4.58333em;
    height: 4.58333em;
    opacity: 1;
    border: none;
    padding: 0;
    background: none;
    font-family: $font_title;
    color: #FFF;
    cursor: pointer;

    &:hover{
      background: transparent;
    }

    svg{
      display: none;
    }

    &:before{
      content: "";
      display: block;
      width: em(30, 24);
      height: em(30, 24);
      margin: 0 auto em(20, 24);
      transform: rotate(45deg);
    }

    &.next{
      &:before{
        border-top: 1px solid currentColor;
        border-right: 1px solid currentColor;
      }
    }

    &.previous{
      &:before{
        border-bottom: 1px solid currentColor;
        border-left: 1px solid currentColor;
      }
    }
    @media screen and (max-width: $mobile-breakpoint) {
      width: em(90, 24);
      height: em(90, 24);
      &::before{
        width: em(25, 24);
        height: em(25, 24);
      }
      &.next{
        right: 0;
      }
      &.previous{
        left: 0;
      }
    }
  }

  .flickity-page-dots{
    font-size: 1em;
    bottom: em(-55);
    left: em(30);
    text-align: left;
    width: auto;

    .dot{
      color: #CECECE;
      width: em(30);
      height: auto;
      padding: em(10) 0;
      background: transparent;
      opacity: 1;
      margin: 0 em(5) 0 0;

      &:before{
        content: "";
        display: block;
        border-bottom: 1px solid currentColor;
      }

      &.is-selected{
        color: #030303;
      }
    }

    /** {
      cursor: pointer !important;
    }*/

    @media screen and (max-width: $mobile-breakpoint) {
      left: 0;
      bottom: em(-35);
      width: 100%;
      text-align: center;
      font-size: 50%;
      display: flex;
      padding: 0 $mobile_padding;
      box-sizing: border-box;
      justify-content: space-around;
      .dot{
        flex: 1;
        &:last-child{
          margin: 0;
        }
      }
    }
  }
  &-dots-in{
    .flickity-page-dots{
      bottom: 2.2em;
      .dot.is-selected{
        color: rgba(206, 206, 206, 0.23);
      }
    }
  }
  &.carousel-kit{
    .flickity-prev-next-button{
      top: 40%;
      @media screen and (max-width: 365px) {
        top: 35%;
      }
    }
  }
}
@media screen and (max-width: $mobile_breakpoint) {
  #app{
    //padding-right: em(30);
    /*position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .wrap{
      height: 100%;
      overflow-y: auto;
    }*/
  }

  img{
    max-width: 100%;
    height: auto;
  }
}

#app {
  .navbar.fixed-top {
      background-color: white;
      border: 1px solid #B9B9B9;
      position: absolute;
      z-index: 99;
      right: 268px;
      top: 36px;
      border-radius: em(25, 14);
      padding: 4px;
        li {
          line-height: 12px;
            a.dropdown-item {
              border-right: 1px solid #B9B9B9;
              display: inline-block;
              padding: 0 4px;
              text-transform: uppercase;
              line-height: 12px;
              margin: 0;
              text-decoration: none;
              strong {
                color: #131836;
                font-size: 10px;
              }
            }
            a.dropdown-item.router-link-active,  
            a.dropdown-item:hover {
              strong {
                color: #037da9;
              }
            }  
            a.dropdown-item:last-child {
              border-right: 0 none;
            }
        }
        @media screen and (max-width: 768px) {
          right: 54px;
          top: 28px;
        }
  }
}
</style>
