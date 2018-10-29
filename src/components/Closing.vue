<template>
  <main class="wrap" :class="{menuOpened: $root.menuOpened}">
    <div class="closing" ref="container">
      <figure class="closing__bg" ref="cover"></figure>
      <div class="closing__content">
        <div class="closing__circle" ref="circle">
          <div class="closing__text" ref="title">
            <h2 class="title-h4">
              While you´ve been here, {{$root.women}} {{counterDescription}} died giving birth.
            </h2>
          </div>
          <svg class="color" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" :stroke-dashoffset="stroke">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop stop-color="#F33C3C" offset="0%"></stop>
                <stop stop-color="#FFDC26" offset="50%"></stop>
                <stop stop-color="#2EFFAE" offset="100%"></stop>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="47" stroke="url(#gradient)" stroke-width="1" fill="none"/>
          </svg>
          <svg class="border" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="47" stroke="white" stroke-width="0.2" stroke-dasharray="0.8" fill="none"/>
          </svg>
        </div>
        <h3 class="title-h4" ref="link">
          You can help<span class="delimiter"></span> <router-link to="/action" class="link-default">stop the clock.</router-link>
        </h3>
      </div>
      <div class="closing__credits">
        <p>© Lynsey Addario for Time</p>
      </div>
    </div>
    <transition name="fade" appear>
      <router-link to="/action" class="scroll-default" v-show="canScroll">
        <scroll-down-component></scroll-down-component>
      </router-link>
    </transition>
  </main>
</template>

<script>
import { TimelineMax, TweenMax, Linear, Power1 } from 'gsap'

import ScrollDownComponent from './ScrollDown'

import slide from './mixins/slide.js'

export default {
  name: 'Closing',
  mixins: [slide],
  data () {
    return {}
  },
  computed: {
    stroke: function () {
      var stroke = (this.$root.counter * 300) / 120
      return 300 - stroke
    },
    counterDescription: function () {
      if (this.$root.women === 1) {
        return 'woman has'
      } else {
        return 'women have'
      }
    }
  },
  methods: {
    nextPage: function () {
      this.canScroll = false
      this.$router.push('/action')
    },
    initTimelines: function () {
      this.timelines[1] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.cover, 7, {scale: 1.1}, {scale: 1, ease: Power1.easeOut}),
          TweenMax.fromTo(this.$refs.title, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.circle, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.link, 0.5, {opacity: 0}, {opacity: 1, delay: 2, ease: Linear.easeInOut})
        ])

      this.firstSlide()
    }
  },
  mounted () {
    this.initTimelines()
  },
  components: {
    ScrollDownComponent
  }
}
</script>

<style lang="scss">
.closing{
  height: 100vh;
  background-color: #0C1020;
  color: #FFF;
  overflow: hidden;
  position: relative;
  &__bg{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(../assets/images/closing-bg.jpg) no-repeat center;
    -webkit-background-size: cover;
    background-size: cover;
    opacity: 0.5;
  }

  &__content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-h4{
      font-size: em(40);
      text-align: center;
      .delimiter::after{
        content: '. ';
      }
      .link-default::first-letter{
        text-transform: uppercase;
      }
    }
    @media screen and (max-width: $mobile-breakpoint) {
      top: prc(50);
      transform: translate(-50%, -50%);
      .title-h4{
        font-size: em(30);
        .delimiter::after{
          content: '.';
        }
      }
    }
    @media screen and (max-height: 620px) {
      top: calc(50% - 40px);
      .title-h4{
        font-size: 1.57em;
        .link-default{
          display: block;
        }
      }
      .closing__circle{
        width: 15.875em;
        height: 15.875em;
        .closing__text .title-h4{
          font-size: 1.8em;
        }
      }
    }
    @media screen and (max-height: 520px) {
      top: calc(50% - 30px);
      .closing__circle{
        width: 14.875em;
        height: 14.875em;
        .closing__text .title-h4{
          font-size: 1.7em;
        }
      }
    }

    /*@media screen and (max-height: 560px) {
      .title-h4{
        font-size: 1.37em;
      }
      .closing__circle{
        width: 12.875em;
        .closing__text .title-h4{
          font-size: 1.4em;
        }
      }
    }*/
  }

  &__circle{
    width: em(380);
    height: em(380);
    position: relative;
    margin: 0 auto em(30);
    /*left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: em(560);
    height: em(560);*/

    &:before{
      //content: "";
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
      /*position: absolute;*/
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      height: auto;
      stroke-dasharray: 300;
      /*stroke-dashoffset: 0;*/
      /*vector-effect: non-scaling-stroke;*/
      /*stroke-width: 2px;*/
      transition: all 1s linear;
      transform: scale(1.065) rotate(-90deg);
      &.border{
        top: 0;
        left: 0;
        position: absolute;
        opacity: 0.3;
        z-index: 0;
      }
      &.color{
        position: relative;
        z-index: 1;
      }
    }
    @media screen and (max-width: $mobile-breakpoint) {
      width: em(270);
      height: em(270);
      svg{
        height: 100%;
      }
    }
    @media screen and (max-width: 340px) {
      width: em(240);
      height: em(240);
    }
  }

  &__text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 0 em(20);
    box-sizing: border-box;
    text-align: center;

    a{
      color: currentColor;
    }
    @media screen and (max-width: $mobile-breakpoint) {
      transform: translate(-50%, -45%);
      .title-h4{
        font-size: 1.8em;
      }
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
  }
  @media screen and (max-width: $mobile-breakpoint) {
    position: relative;
  }
}
@media screen and (max-width: $mobile-breakpoint) {
  .closing__credits{
    display: none;
  }
}
</style>
