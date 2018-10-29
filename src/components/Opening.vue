<template>
  <section class="opening">
    <div class="opening__content" ref="container">
      <!-- <div class="opening__logo" ref="logo">
        <img src="../assets/images/logo-unfpa.svg" alt="">
      </div> -->
      <div class="opening__section section1" ref="section1">
        <h2 class="title-h4" ref="title">Every 2 minutes, <br>a woman dies giving birth</h2>
        <!-- <div ref="scroll1">
          <scroll-down-component></scroll-down-component>
        </div> -->
        <div class="opening__circle" ref="opening_circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" ref="circleSvg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop stop-color="#F33C3C" offset="0%"></stop>
                <stop stop-color="#FFDC26" offset="50%"></stop>
                <stop stop-color="#2EFFAE" offset="100%"></stop>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="47" stroke="url(#gradient)" stroke-width="0.5" fill="none"/>
          </svg>
        </div>
        <!-- <h2 class="title-h2" v-html="createLetters('Getting to zero preventable maternal deaths')"></h2> -->
      </div>
      <div class="opening__section section2" ref="section2">
        <div class="opening__counter" ref="counter">
          <counter-component></counter-component>
        </div>
        <!-- <div class="opening__scroll" ref="scroll2">
          <scroll-down-component></scroll-down-component>
        </div> -->
      </div>
      <div class="opening__section section3" ref="section3">
        <h2 class="title-h2 section3__title1" ref="subtitle1">That’s 830 women every day</h2>
        <h2 class="title-h2 section3__title2" ref="subtitle2">Most could have been saved</h2>
        <!-- <router-link to="/map" class="link-default" ref="nextbutton">Next</router-link> -->
      </div>
      <div class="opening__footer" ref="footer">
        <div class="credits">
          <p>safe birth even here ® 2018 . <a href="#" target="_blank">Privacy Policy</a> and <a href="https://www.unfpa.org/terms-use" target="_blank">Terms of Use</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { TimelineMax, TweenMax, Linear, Power2, Power3 } from 'gsap'

// import ScrollDownComponent from './ScrollDown'
import CounterComponent from './Counter'

// var keys = {37: 1, 38: 1, 39: 1, 40: 1}

export default {
  name: 'Opening',
  data () {
    return {
      controller: null,
      wh: null,
      canScroll: true,
      timelines: []
    }
  },
  methods: {
    // moveLetters: function (ref, el, offset, duration, dir) {
    //   var letters = el.querySelectorAll('.letter')
    //   var tweenArray = []
    //   var delay = 0

    //   var x1 = dir === 'in' ? 40 : 0
    //   var x2 = dir === 'in' ? 0 : -40

    //   var opacity1 = dir === 'in' ? 0 : 1
    //   var opacity2 = dir === 'in' ? 1 : 0

    //   for (var i = 0; i < letters.length; i++) {
    //     tweenArray.push(TweenMax.fromTo(letters[i], 0.5, {x: x1, opacity: opacity1}, {x: x2, opacity: opacity2, delay: delay, ease: Power2.easeOut}))
    //     delay+=0.03
    //   }

    //   var tween = new TimelineMax().add(tweenArray)

    //   var scene = new ScrollMagic.Scene({triggerElement: ref, triggerHook: 'onLeave', offset: offset, duration: duration})
    //     .setTween(tween)
    //     .addTo(this.controller)

    //   return scene
    // },
    // createLetters: function (text) {
    //   var finalText = text.replace(/([^\x00-\x20]|\w)/g, '<span class=\'letter\'>$&</span>')
    //   return finalText
    // },
    resizeScene: function () {
      this.wh = window.innerHeight
      // if (this.controller) {
      //   this.controller.destroy(true)
      //   this.$nextTick(this.initParallax())
      // }
    },
    initTimelines: function () {
      this.timelines[1] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.title, 1, {opacity: 0, y: 10}, {opacity: 1, y: 0, delay: 0.5, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.opening_circle, 0.5, {opacity: 0}, {opacity: 1, delay: 1.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.footer, 0.5, {opacity: 0}, {opacity: 1, delay: 1.5, ease: Linear.easeInOut})
          // TweenMax.fromTo(this.$refs.scroll1, 0.5, {opacity: 0, y: 5}, {opacity: 1, y: 0, delay: 2, ease: Linear.easeInOut})
        ])

      this.timelines[2] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.section1, 0.5, {opacity: 1}, {opacity: 0, delay: 0.7, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.footer, 0.5, {opacity: 1}, {opacity: 0, delay: 0.7, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.section2, 0.5, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 1.5, ease: Linear.easeInOut})
        ])

      var clockTop = (70 / 16) + 'em'
      if (this.$root.isMobile) {
        clockTop = (40 / 16) + 'em'
      }

      this.timelines[4] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.section3, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.counter, 0.5, {scale: 1, top: clockTop, x: '-50%', y: '-50%'}, {scale: 4, top: '50%', x: '-50%', y: '-50%', delay: 0.5, ease: Power3.easeInOut})
          // TweenMax.fromTo(this.$refs.scroll2, 0.3, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 0.5, ease: Power2.easeOut})
        ])

      this.timelines[3] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.counter, 0.7, {scale: 4, top: '50%', x: '-50%', y: '-50%'}, {scale: 1, top: clockTop, x: '-50%', y: '-50%', delay: 0, ease: Power3.easeInOut}),
          // TweenMax.fromTo(this.$refs.scroll2, 0.3, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', delay: 0, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.section3, 0.7, {opacity: 0, y: '-45%', display: 'none'}, {opacity: 1, y: '-50%', display: 'block', delay: 0.7, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.subtitle1, 0.5, {opacity: 1, y: '-50%', display: 'block'}, {opacity: 0, y: '-45%', display: 'none', delay: 2, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.subtitle2, 0.7, {opacity: 0, y: '-45%', display: 'none'}, {opacity: 1, y: '-50%', display: 'block', delay: 2.5, ease: Power2.easeOut})
          // TweenMax.fromTo(this.$refs.nextbutton, 0.3, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 2.5, ease: Linear.easeInOut})
        ])

      TweenMax.to(this.$refs.footer, 0.01, {opacity: 0, ease: Linear.easeNone})
    },
    animateSlide: function (newValue, oldValue) {
      var that = this

      if (newValue === 3 && oldValue === 0) {
        this.timelines[1].progress(100)
        this.timelines[2].progress(100)
        this.timelines[3].progress(100)
        return 500
      }

      if (newValue > oldValue) {
        if (newValue === 2) {
          TweenMax.to(this.$refs.counter, 0.01, {scale: 4, top: '50%', x: '-50%', y: '-50%', ease: Linear.easeNone})
          TweenMax.fromTo(this.$refs.circleSvg, 1, {strokeDashoffset: 300}, {strokeDashoffset: 0, ease: Power3.easeInOut})

          if (this.$root.women === null) {
            setTimeout(function () {
              that.$root.women = 1
            }, 2000)
          }
        }
        this.timelines[newValue].restart()
      } else {
        if (newValue === 1) {
          TweenMax.to(this.$refs.circleSvg, 0.01, {strokeDashoffset: 300, ease: Linear.easeNone})
        }
        if (newValue === 2) {
          this.timelines[4].restart()
        } else {
          this.timelines[oldValue].reverse()
        }
      }
    }
  },
  mounted () {
    this.wh = window.innerHeight
    this.initTimelines()
  },
  components: {
    CounterComponent
  }
}
</script>

<style lang="scss" scoped>
.opening{
  position: relative;

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

  &__section:not(.section2){
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: #FFF;
    transform: translateY(-50%);

    ::selection {
      background: transparent;
    }
  }

  .section1{
    .title-h2{
      max-width: em(870, 80);
      margin: 0 auto;
    }

    .scroll-down{
      margin-top: em(50);
      margin-bottom: em(-125);
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
    color: #FFF;

    .scroll-down{
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
    }
  }

  .section3{
    display: none;

    .title-h2{
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      transform: translateY(-50%);
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
  }

  &__footer{
    position: absolute;
    bottom: em(25);
    left: 0;
    width: 100%;

    a{
      color: currentColor;
      text-decoration: none;
    }

    @media screen and (max-width: $mobile_breakpoint) {
      display: none;
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

    &__circle{
      width: 90vw;
      height: 90vw;
    }
  }
}
</style>
