<template>
  <div class="video-player" :class="{playing: playing, full: fullmode, 'video-front': $root.testBrowser('safari') || $root.testBrowser('safari mobile')}" v-on:click="toggle" @mousemove="updateMousePosition" @mouseleave="mouseLeave">
    <div class="video-player__overlay" ref="overlay"></div>
    <div class="video-player__button" ref="buttonContainer">
      <button ref="button"><span>{{label[$root.lang]}}</span> <i></i></button>
      <svg class="video-player__circle" viewBox="0 0 134 134" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <circle ref="svg" cx="66" cy="66" r="66" style="transform: translate(1px, 1px); rotate(" stroke-width="3" fill="none"></circle>
      </svg>
    </div>
    <div class="video-player__title" ref="title">
      <h4 class="title-h4">{{title}}</h4>
    </div>
    <figure class="video-player__cover" ref="cover" :style="{'background-image': 'url(' + cover + ')' }"></figure>
    <video :src="src" ref="media" controls="" @webkitfullscreenchange="fullScreen" @mozfullscreenchange="fullScreen" @fullscreenchange="fullScreen"></video>
  </div>
</template>

<script>
import {TweenMax, Power2, Linear} from 'gsap'

export default {
  name: 'Video',
  props: {
    title: String,
    src: String,
    cover: String,
    fullmode: Boolean
  },
  data () {
    return {
      playing: false,
      label: {
        'en': 'Play',
        'fr': 'Play Fr'
      },
      svgFilled: false,
      miau: false,
      lastScroll: 0
    }
  },
  methods: {
    toggle: function () {
      this.lastScroll = document.scrollingElement.scrollTop
      if (this.$root.testBrowser('samsung')) {
        this.$refs.media.play()
        this.playing = !this.$refs.media.paused
      } else {
        this.playing = (this.$root.testBrowser('safari') && this.$root.isMobile) ? this.$refs.media.paused : !this.playing
      }
    },
    fullScreen (e) {
      e.stopPropagation()
      if (!this.$refs.media.webkitDisplayingFullscreen) {
        document.scrollingElement.scrollTop = this.lastScroll
      }

      var s = this
      if (!this.$root.isMobile) {
        setTimeout(function () {
          s.$refs.media.play()
          s.playing = true
        }, 500)
      }
    },
    updateMousePosition: function (e) {
      if (this.$root.isTablet || document.body === undefined) return false
      var center = {x: window.innerWidth / 2, y: this.$refs.media.clientHeight / 2 + this.$refs.media.getBoundingClientRect().top}
      var d = Math.sqrt(Math.pow((center.x - e.clientX), 2) + Math.pow((center.y - e.clientY), 2))
      var buttonContainer = this.$refs.buttonContainer
      if (d < buttonContainer.clientHeight / 2) {
        var x = 0.6 * (100 * (e.clientX - buttonContainer.getBoundingClientRect().left) / 134 - 50)
        var y = 0.6 * (100 * (e.clientY - buttonContainer.getBoundingClientRect().top) / 134 - 50)

        var button = this.$refs.button
        buttonContainer.classList.add('hover')

        TweenMax.to(button, 0.2, {
          x: x + 'px',
          y: y + 'px',
          ease: Linear.easeNone
        })

        if (!this.svgFilled) {
          this.svgFilled = true
          TweenMax.to(this.$refs.svg, 1.5, {
            strokeDashoffset: 0,
            ease: Power2.easeInOut,
            onComplete: function e () {
              // that.playing = true
            }
          })
        }
      } else {
        TweenMax.to(this.$refs.button, 0.2, {
          x: '0px',
          y: '0px',
          ease: Linear.easeNone
        })
        this.$refs.buttonContainer.classList.remove('hover')

        if (this.svgFilled) {
          this.svgFilled = false
          TweenMax.to(this.$refs.svg, 0.5, {
            strokeDashoffset: 515,
            ease: Power2.easeInOut
          })
        }
      }
    },
    mouseLeave: function () {
      if (this.$root.isTablet || this.$refs.button === undefined) return false

      TweenMax.to(this.$refs.button, 0.2, {
        x: '0px',
        y: '0px',
        ease: Linear.easeNone
      })

      this.$refs.buttonContainer.classList.remove('hover')

      var svg = this.$refs.svg
      if (this.svgFilled) {
        this.svgFilled = false
        TweenMax.to(svg, 0.5, {
          strokeDashoffset: 515,
          ease: Power2.easeInOut
        })
      }
    },
    scrollEvent: function (e) {
      var rect = this.$el.getBoundingClientRect()
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
      var visible = !(rect.bottom < 0 || rect.top - viewHeight >= 0)
      if (!visible) {
        this.playing = false
      }
    }
  },
  watch: {
    playing: function (value) {
      var overlay = this.$refs.overlay
      var media = this.$refs.media
      var cover = this.$refs.cover
      var opacity = value ? 0 : 1

      var buttonContainer = this.$refs.buttonContainer
      TweenMax.to(buttonContainer, 0.3, {
        opacity: opacity,
        ease: Power2.easeInOut
      })

      var title = this.$refs.title
      TweenMax.to(title, 0.3, {
        opacity: opacity,
        delay: 0.5,
        ease: Power2.easeInOut
      })

      if (value) {
        TweenMax.fromTo(overlay, 1, {x: '-100%'}, {
          x: '0%',
          ease: Power2.easeInOut,
          onComplete: function e () {
            cover.style.opacity = opacity
            cover.style.zIndex = -1
            TweenMax.fromTo(overlay, 0.3, {opacity: 1}, {
              opacity: 0,
              ease: Linear.easeNone,
              delay: 0.1,
              clearProps: 'all',
              onComplete: function e () {
                media.play()
              }
            })
          }
        })
      } else {
        TweenMax.fromTo(overlay, 0.3, {x: 0, opacity: 0}, {
          x: 0,
          opacity: 1,
          ease: Linear.easeNone,
          onComplete: function e () {
            cover.style.opacity = opacity
            cover.style.zIndex = 1
            TweenMax.fromTo(overlay, 1, {x: '0%'}, {
              x: '-100%',
              ease: Power2.easeInOut,
              clearProps: 'all',
              onComplete: function e () {
                media.pause()
              }
            })
          }
        })
      }
    }
  },
  destroyed () {
    document.removeEventListener('scroll', this.scrollEvent)
  },
  created () {
    document.addEventListener('scroll', this.scrollEvent)
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.video-player{
  overflow: hidden;
  position: relative;
  width: 100%;

  &__title{
    position: absolute;
    z-index: 2;
    width: 100%;
    left: 0;
    top: calc(50% + 6em);
    text-align: center;
    color: #FFF;
  }

  &__button{
    position: absolute;
    z-index: 2;
    width: em(134);
    height: em(134);
    border: 1px solid $color2;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    transition: opacity 0.3s ease-in-out;

    button{
      font-size: 1em;
      padding: 0;
      background: transparent;
      border: none;
      width: em(60);
      height: em(60);
      border-radius: 50%;
      /*background-color: #FFF;*/
      background: url(../assets/images/icon-play.svg) no-repeat center;
      -webkit-background-size: auto em(30);
      background-size: auto em(30);
      cursor: pointer;
      position: absolute;
      top: calc(50% - 1.875em);
      left: calc(50% - 1.875em);

      span{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-100%, -50%);
        font-size: em(14);
        letter-spacing: em(-0.07, 14);
        line-height: 1em;
        width: em(120, 14);
        color: #FFF;
        text-transform: uppercase;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        &:after{
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 0;
          height: 1px;
          background-color: currentColor;
          margin: 0 em(10, 14);
          /*transform: scale(0,1);*/
          transition: width 0.3s ease-in-out;
        }
      }

      /*i{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: em(-5);
        margin-left: em(-2);
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 0 5px 8px;
        border-color: transparent transparent transparent $color1;
      }*/
    }

    &.hover{
      button{
        span{
          opacity: 1;

          &:after{
            width: em(30, 14);
          }
        }
      }
    }
  }

  &__circle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);

    circle{
      transition: stroke-dasharray 0.3s ease-in-out;
      stroke-dasharray: 515;
      stroke-dashoffset: 515;
      stroke: $color2;
    }
  }

  &__overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: 3;
    transform: translateX(-100%);
    pointer-events: none;
  }

  &__cover{
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    &:before{
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(000,000,000,0.6);
    }
  }

  video{
    width: 100%;
    height: auto;
    object-position: center;
    object-fit: cover;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  @media screen and (min-width: $mobile_breakpoint+1) {
    &.full{
      height: 100vh;

      video{
        height: 100%;
      }
    }
  }

  @media screen and (max-width: $mobile_breakpoint - 1) {
    overflow: visible;
    &::after {
      content: '';
      width: $mobile_padding;
      height: calc(100% + 3px);
      background-color: white;
      position: absolute;
      left: -$mobile_padding;
      top: -1px;
      z-index: 4;
    }
    &__button{
      font-size: 50%;
    }

    &__title{
      top: inherit;
      bottom: em(-26);

      * {
        font-family: Muli;
        color: #0C1020;
        line-height: 1.16667em;
        text-align: left;
        font-size: 0.875em;
        letter-spacing: -0.00533em;
      }
    }
  }
  &.playing{
    video{
      opacity: 1;
    }
  }
  &.video-front{
    video{
      position: relative;
      z-index: 4;
    }
  }
  /*&.playing{
    .video-player__cover{
      opacity: 0;
    }
    .video-player__button{
      opacity: 0;

      .video-player__circle{
        circle{
          stroke-dashoffset: 0;
        }
      }
    }
  }*/
}
</style>
