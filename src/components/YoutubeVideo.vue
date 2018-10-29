<template>
  <div class="video-player" :class="{playing: playing, full: fullmode}">
    <div class="video-player__overlay" ref="overlay"></div>
    <div class="video-player__button" ref="buttonContainer" @mousemove="updateMousePosition" @mouseenter="mouseEnter" @mouseleave="mouseLeave" v-on:click="playing=!playing">
      <button ref="button"><span>{{label[$root.lang]}}</span> <i></i></button>
      <svg class="video-player__circle" viewBox="0 0 134 134" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <circle ref="svg" cx="66" cy="66" r="66" style="transform: translate(1px, 1px); rotate(" stroke-width="3" fill="none"></circle>
      </svg>
    </div>
    <figure class="video-player__cover" ref="cover" :style="{'background-image': 'url(' + cover + ')' }"></figure>
    <video :src="src" ref="media" controls="" v-on:click="playing=false"></video>
  </div>
</template>

<script>
import {TweenMax, Power2, Linear} from 'gsap'

export default {
  name: 'Video',
  props: {
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
      }
    }
  },
  methods: {
    updateMousePosition: function (e) {
      if (this.$root.isTablet) return false
      var buttonContainer = this.$refs.buttonContainer
      var x = 0.6 * (100 * (e.clientX - buttonContainer.getBoundingClientRect().left) / 134 - 50)
      var y = 0.6 * (100 * (e.clientY - buttonContainer.getBoundingClientRect().top) / 134 - 50)

      var button = this.$refs.button
      TweenMax.to(button, 0.2, {
        x: x + 'px',
        y: y + 'px',
        ease: Linear.easeNone
      })
    },
    mouseEnter: function () {
      if (this.$root.isTablet) return false
      var svg = this.$refs.svg
      var that = this

      TweenMax.to(svg, 2, {
        strokeDashoffset: 0,
        ease: Power2.easeInOut,
        onComplete: function e () {
          that.playing = true
        }
      })
    },
    mouseLeave: function () {
      if (this.$root.isTablet) return false
      var button = this.$refs.button

      TweenMax.to(button, 0.2, {
        x: '0px',
        y: '0px',
        ease: Linear.easeNone
      })

      var svg = this.$refs.svg

      TweenMax.to(svg, 0.3, {
        strokeDashoffset: 515,
        ease: Power2.easeInOut
      })
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
  created () {
    document.addEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style lang="scss" scoped>
.video-player{
  overflow: hidden;
  position: relative;
  width: 100%;

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
      background-color: #FFF;
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

      i{
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
      }
    }

    &:hover{
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
  }

  video{
    width: 100%;
    height: auto;
    object-position: center;
    object-fit: cover;
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
    &__button{
      font-size: 70%;
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
