<template>
  <main class="wrap" :class="{menuOpened: $root.menuOpened}">
    <section class="opening" :class="{'translate-mobile': $root.testBrowser('chrome mobile') || $root.testBrowser('safari mobile'), 'safari-mobile': $root.testBrowser('safari mobile'), 'ms': $root.testBrowser('ie') || $root.testBrowser('edge')}">
      <div class="opening__content" ref="container">
        <div class="opening__section section0" ref="section0">
          <div class="opening__background" :class="{'offset-top': $root.testBrowser('chrome mobile')}" ref="background0"></div>
          <h2 class="title-h2 section3__title2" ref="title0">{{ $t('safe_birth_title') }}</h2>
          <p ref="safeText">{{ $t('safe_birth_tag_line') }}</p>
        </div>
        <div class="opening__section section1" ref="section1">
          <div class="opening__background" :class="{'offset-top': $root.testBrowser('chrome mobile')}" ref="background1"></div>
          <h2 class="title-h4" ref="title"><p v-html="$t('opening_tag_line')" /></h2>
          <!--<h2 class="title-h4" ref="title">{{ua}}</h2>-->
          <div class="opening__circle" ref="opening_circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" ref="circleSvg">
              <defs>
                <linearGradient id="gradient_home" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop stop-color="#F33C3C" offset="0%"></stop>
                  <stop stop-color="#FFDC26" offset="50%"></stop>
                  <stop stop-color="#2EFFAE" offset="100%"></stop>
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="47" stroke="url(#gradient_home)" stroke-width="0.5" fill="none"/>
            </svg>
          </div>
        </div>
        <div class="opening__section section2" ref="section2">
          <div class="opening__counter" ref="counter" :class="{top: moveTop}">
            <counter-component :class="{big: !moveTop && $root.testBrowser('safari')}"></counter-component>
          </div>
          <p ref="counterText">{{ $t('clock_text') }}</p>
        </div>
        <div class="opening__section section3" ref="section3">
          <div class="opening__background" ref="background2"></div>
          <h2 class="title-h2 section3__title1" ref="subtitle1">{{ $t('clock_message') }}</h2>
          <h2 class="title-h2 section3__title2" ref="subtitle2">{{ $t('clock_message_2') }}</h2>
          <!-- <router-link to="/map" class="link-default" ref="nextbutton">Next</router-link> -->
          <div class="section3__credits" ref="credits">
            <p>© {{ $t('unfpa_elena_heatherwick') }}</p>
          </div>
        </div>
        <div class="opening__footer" ref="footer">
          <p class="opening__instructions" ref="instruction">{{ $t('scroll_message') }}</p>
          <p v-if="!$root.isMobile">{{ $t('safe_birth_title_bottom') }} ® 2018
          <br><a href="#" target="_blank">{{ $t('scroll_message') }}</a> and <a href="https://www.unfpa.org/terms-use" target="_blank">{{ $t('terms_of_use') }}</a></p>
          <p v-if="!$root.isMobile" v-html="$t('young_mother_in_south_sudan')" />
        </div>
      </div>
    </section>
    <transition name="fadescroll" appear>
      <div class="scroll-default" v-show="canScroll && slide != 4" v-on:click="move('next')">
        <scroll-down-component></scroll-down-component>
      </div>
    </transition>
  </main>
</template>

<script>
import ScrollDownComponent from './ScrollDown'
import CounterComponent from './Counter'

import { TimelineMax, TweenMax, Linear, Power2, Power3 } from 'gsap'

import slide from './mixins/slide.js'

export default {
  name: 'Home',
  mixins: [slide],
  data () {
    return {
      wh: 0,
      ww: 0,
      moveTop: false,
      lastSlide: 0,
      ua: window.navigator.userAgent
    }
  },
  methods: {
    initTimelines: function () {
      this.timelines[1] = new TimelineMax({paused: true, onComplete: this.timelineComplete})
        .add([
          TweenMax.to(this.$refs.section0, 1, {opacity: 1, ease: Power2.easeOut})
        ])
      this.timelines[2] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.section0, 0.5, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.title, 1, {opacity: 0, y: '-45%', x: '-50%'}, {opacity: 1, y: '-50%', x: '-50%', delay: 0.7, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.opening_circle, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.footer, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut})
          // TweenMax.fromTo(this.$refs.scroll1, 0.5, {opacity: 0, y: 5}, {opacity: 1, y: 0, delay: 2, ease: Linear.easeInOut})
        ])
      this.timelines[3] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.circleSvg, 0.7, {strokeDashoffset: 300}, {strokeDashoffset: 0, ease: Power3.easeInOut}),
          TweenMax.fromTo(this.$refs.footer, 0.5, {opacity: 1}, {opacity: 0, delay: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.section1, 0.5, {opacity: 1}, {opacity: 0, delay: 0.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.section2, 0.5, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 1.5, ease: Linear.easeInOut})
        ])

      // var clockTop = (49 / 16) + 'em'
      // if (this.$root.isMobile) {
      //   clockTop = (42 / 16) + 'em'
      // }

      // var clockLeft =  '50%'
      // if (this.$root.isMobile) {
      //   clockLeft = (window.innerWidth - 30 - 25 - 24) + 'px'
      // }

      this.timelines[4] = new TimelineMax({paused: true, onComplete: this.timelineComplete})
        .add([
          // TweenMax.fromTo(this.$refs.counter, 0.7, {scale: this.$root.testBrowser('safari') ? 1 : 3, top: '50%', left: '50%', x: '-50%', y: '-50%'}, {scale: 1, left: clockLeft, top: clockTop, x: '-50%', y: '-50%', delay: 0, ease: Power3.easeInOut}),
          TweenMax.fromTo(this.$refs.counterText, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', delay: 0, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.section3, 0.7, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 0.7, ease: Power2.easeOut})
        ])

      this.timelines[5] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.subtitle1, 0.5, {opacity: 1, y: '-50%', display: 'block'}, {opacity: 0, y: '-45%', display: 'none', ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.background2, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.credits, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.subtitle2, 0.7, {opacity: 0, y: '-45%', display: 'none'}, {opacity: 1, y: '-50%', display: 'block', delay: 0.5, ease: Power2.easeOut})
        ])

      // this.timelines[4] = new TimelineMax({paused: true})
      //   .add([
      //     TweenMax.fromTo(this.$refs.section3, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', ease: Linear.easeInOut}),
      //     TweenMax.fromTo(this.$refs.counter, 0.5, {scale: 1, top: clockTop, x: '-50%', y: '-50%'}, {scale: 4, top: '50%', x: '-50%', y: '-50%', delay: 0.5, ease: Power3.easeInOut})
      //   ])

      TweenMax.to(this.$refs.footer, 0.01, {opacity: 0, ease: Linear.easeNone})
      this.firstSlide()
    },
    finishScrollBack: function () {
      this.moveClock('forward', 0.01)
    },
    moveClock: function (direction, duration) {
      var clockTop = (49 / 16) + 'em'
      if (this.$root.isMobile) {
        clockTop = (42 / 16) + 'em'
      }

      var clockLeft = '50%'
      if (this.$root.isMobile) {
        clockLeft = (window.innerWidth - 30 - 35 - 24) + 'px'
      }

      if (direction === 'forward') {
        this.moveTop = true
        TweenMax.fromTo(this.$refs.counter, duration, {scale: this.$root.testBrowser('safari') ? 1 : 3, top: this.$root.isMobile ? (this.wh * 0.5 - 56) + 'px' : '50%', left: '50%', x: '-50%', y: '-50%'}, {scale: 1, left: clockLeft, top: clockTop, x: '-50%', y: '-50%', delay: 0, ease: Power3.easeInOut})
      } else {
        this.moveTop = false
        TweenMax.fromTo(this.$refs.counter, duration, {scale: 1, left: clockLeft, top: clockTop, x: '-50%', y: '-50%'}, {scale: this.$root.testBrowser('safari') ? 1 : 3, top: this.$root.isMobile ? (this.wh * 0.5 - 56) + 'px' : '50%', left: '50%', x: '-50%', y: '-50%', delay: 0.5, ease: Power3.easeInOut})
      }
    },
    animateSlide: function (newValue, oldValue) {
      var scrollDelay = 700
      this.lastSlide = newValue
      if (newValue === 1) {
        document.getElementById('app').classList.add('hide-nav')
      } else {
        document.getElementById('app').classList.remove('hide-nav')
      }
      if (newValue === 2) {
        document.getElementById('safeBirthText').classList.add('show')
        TweenMax.fromTo(this.$refs.instruction, 0.5, {opacity: 0, y: 10, x: '-50%'}, {opacity: 1, y: 0, x: '-50%', delay: 4, ease: Power2.easeOut})
      } else {
        document.getElementById('safeBirthText').classList.remove('show')
      }

      if (newValue > oldValue) {
        if (newValue === 3) {
          this.moveTop = false
          TweenMax.to(this.$refs.counter, 0.01, {scale: this.$root.testBrowser('safari') ? 1 : 3, top: this.$root.isMobile ? (this.wh * 0.5 - 56) + 'px' : '50%', x: '-50%', y: '-50%', ease: Linear.easeNone})
          TweenMax.fromTo(this.$refs.circleSvg, 1, {strokeDashoffset: 300}, {strokeDashoffset: 0, ease: Power3.easeInOut})

          if (this.$root.women === null) {
            this.$root.women = 0
          }
        } if (newValue === 4) {
          this.moveClock('forward', 0.7)
        }
        this.timelines[newValue].restart()
      } else {
        if (newValue === 2) {
          TweenMax.to(this.$refs.circleSvg, 0.01, {strokeDashoffset: 300, ease: Linear.easeNone})
        } else if (newValue === 3) {
          this.moveClock('backward', 0.7)
        }
        this.timelines[oldValue].reverse()
      }

      return scrollDelay
    }
  },
  mounted () {
    /* if(this.slide == 0)
    document.getElementById('app').classList.add('hide-nav'); */
    this.wh = window.innerHeight
    this.ww = window.innerWidth
    this.initTimelines()
  },
  components: {
    ScrollDownComponent,
    CounterComponent
  }
}
</script>

<style lang="scss">
.opening{
  position: relative;
  background-color: $color_body;

  &__background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center left 30%;
    background-size: cover;
    &.offset-top{
      transform: translateY(-$offset_mobile);
    }
  }

  &__logo{
    position: absolute;
    left: em(50);
    top: em(35);
    z-index: 2;

    img{
      width: auto;
      height: em(42);
    }
  }

  &__content{
    height: 100vh;
    position: relative;
    z-index: 2;
  }
  &.ms {
    .opening__section{
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  &__section:not(.section2){
    color: #FFF;

    ::selection {
      background: transparent;
    }
  }
  .section0{
    .title-h2, p{
      position: absolute;
      top: 50%;
      left: 0%;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      transform: translateY(-50%);
    }
    .title-h2{
      font-size: 5.7em !important;
    }
    p{
      font-size: 16px;
      margin-top: em(85);
      font-weight: normal;
    }
    .opening__background{
      background-image: url(../assets/images/op.jpg);
    }
    @media screen and (max-width: 1000px) {
      .title-h2{
        font-size: 5em !important;
      }
    }
    @media screen and (max-width: $mobile-breakpoint) {
      .title-h2{
        font-size: 3.4em !important;
        max-width: 334px;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
      p{
        width: 265px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 3.5em;
        font-size: 1.025em;
      }
    }
  }
  .section1{
    .title-h2{
      max-width: em(870, 80);
      margin: 0 auto;
    }

    .title-h4{
      position: absolute;
      width: 100%;
      max-width: rem(560);
      top: 50%;
      left: 50%;
      text-align: center;
    }

    .scroll-down{
      margin-top: em(50);
      margin-bottom: em(-125);
    }

    .opening__background{
      background-image: url(../assets/images/op_color.jpg);
      z-index: -1;
    }
    @media screen and (max-height: 700px) {
      .title-h4{
        max-width: 25rem;
      }
      .opening__circle{
        width: 25em;
        height: 25em;
      }
    }
    @media screen and (max-width: $mobile-breakpoint) {
      .title-h4{
        font-size: em(30);
        max-width: em(240, 30);
        /*padding: 0 em(30);*/
      }
    }
  }

  &__circle{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: em(560);
    height: em(560);
    z-index: -1;

    &:before{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px dashed #FFF;
      border-radius: 50%;
      opacity: 0.3;
    }

    svg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      stroke-dasharray: 300;
      stroke-dashoffset: 300;
      /*vector-effect: non-scaling-stroke;*/
      /*stroke-width: 2px;*/
      transform: scale(1.065) rotate(-90deg);
    }
  }

  .section2{
    color: white;

    .scroll-down{
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
    }

    p{
      font-size: em(18);
      line-height: em(30, 18);
      position: absolute;
      width: 100%;
      max-width: em(430, 18);
      top: 50%;
      left: 50%;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, 100px);
    }

    @media screen and (max-width: $mobile-breakpoint) {
      p{
        font-size: em(14);
        margin: 0;
        padding: 0 em(30, 14);
        box-sizing: border-box;
        margin: em(30, 14) 0 0;
        transform: translate(-50%, 100%);
      }
    }
  }

  .section3{

    .title-h2, .logo{
      position: absolute;
      top: 45%;
      left: 0;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      transform: translateY(-50%);
      &.section3__title12, &.logo{
        top: 55%;
      }
      &.section3__title2{
        //font-family: Muli;

      }
    }
    .logo{
      width: 125px;
      left: 50%;
      transform: translateX(-50%);
    }
    @media screen and (max-width: $mobile-breakpoint) {
      .section3__title12{
        top: calc(55% - 56px + 40px) !important;
      }
      .section3__title2{
        padding: 0px;
        font-size: 1.6em;
      }
      .logo{
        width: 80px;
        top: calc(50% - 36px) !important;
      }
    }

    a{
      display: block;
      font-size: em(40);
      line-height: 1em;
      color: #FFF;
      font-family: $font_title;
      position: absolute;
      bottom: -30vh;
      left: 50%;
      transform: translateX(-50%);
    }

    .opening__background{
      background-image: url(../assets/images/opening-bg.jpg);
      z-index: -1;

      @media screen and (max-width: $mobile-breakpoint) {
        background-position: center left 50%;
      }
    }

    &__credits{
      position: absolute;
      bottom: em(35);
      right: em(50);

      p{
        text-align: right;
        font-size: em(10);
        margin: 0;
        color: #FFF;
      }

      @media screen and (max-width: $mobile-breakpoint) {
        display: none;
        /*bottom: em(15);
        right: em(30);*/
      }
    }
  }
  .section0, .section2, .section3{
    .title-h2{
      @media screen and (max-width: 1400px) {
        font-size: 4em;
      }
      @media screen and (max-width: 1150px) {
        font-size: 3em;
      }
      @media screen and (max-width: 1000px) {
        font-size: 2em;
      }
    }
  }
  &__footer{
    position: absolute;
    bottom: em(15);
    left: 0;
    width: 100%;
    padding: 0 em(50);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;

    p{
      font-size: em(10);
      margin: 0;
      color: #FFF;

      &:nth-child(2){
        margin-right: auto;
      }

      &:last-child{
        text-align: right;
      }
    }

    a{
      color: currentColor;
      text-decoration: none;
    }
  }

  &__instructions{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    text-align: center;

    @media screen and (max-width: $mobile-breakpoint) {
      line-height: em(15, 10);
      width: em(220, 10);
    }
  }

  &__canvas{
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  }

  &__counter{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10;
    -webkit-transform-style: preserve-3d;

    a{
      display: block;
      text-decoration: none;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    .section0 .title-h2, .section2 p, .section3 .title-h2, &__counter{
      top: prc(53);
    }
    &.translate-mobile{
      .section0 .title-h2, .section1 .title-h4, .opening__circle, .section2 p, .section3 .title-h2{
        top: prc(50) !important;
      }
      .section0 p{
        margin-top: 2.5em;
      }
    }
    &.safari-mobile{
      .section0, .section1{
        .opening__background{
          transform: translateY(-56px);
          height: calc(100% - 56px);
          background-position-y: 100%;
        }
      }
    }
    &__section{
      padding: 0 em(20);
      box-sizing: border-box;
    }
    .section3{
      .title-h2{
        box-sizing: border-box;
        padding: 0 em(20);
      }
    }

    &__footer{
      bottom: em(15)
    }

    .opening .section1 &__circle{
      width: em(240);
      height: em(240);
    }
    .section0, .section1{
      .opening__background{
        //background-position-x: 35%;
      }
    }
  }
  @media screen and (max-width: 420px) {
    &__footer{
      display: none;
    }
    .section0 .opening__background{
      background-image: url(../assets/images/op_m.jpg);
    }
    .section1 {
      .title-h4{
        top: 50% !important;
        left: calc(50% + 3px) !important;
      }
      .opening__background{
        background-image: url(../assets/images/op_color_m.jpg);
      }
    }
    &.translate-mobile{
      .section1 .title-h4{
        top: calc(50% - 52px) !important;
      }
    }
  }
  &.safari-mobile{
    .section0, .section1{
      .opening__background{
        //transform: translateY(-56px);
        background-position-y: 100%;
        @media screen and (min-height: 667px) {
          height: calc(100vh - 56px);
        }
        @media screen and (min-height: 812px) {
          height: calc(100vh - 110px);
        }
      }
    }
  }
}
</style>
