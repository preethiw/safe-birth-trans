<template>
  <transition v-on:enter="enter" v-on:leave="leave">
    <div class="story-menu" v-show="showMenu" ref="menu">
      <bg-switch-component v-bind:current="bg" v-bind:backgrounds="['haiti-menu.jpg', 'donate-bg.jpg', 'liberia-menu.jpg']"></bg-switch-component>
      <div class="story-menu__content">
        <ul v-on:mouseleave="bg = initialBg" ref="list">
          <li v-for="(item, index) in stories" v-on:mouseover="bg = (index + 1)" :class="{active: item == $route.name}" :key="item">
            <router-link :to="'/'+item">
              <figure>
                <svg :viewBox="viewBox(item)"><use :xlink:href="mapPath(item)"></use></svg>
              </figure>
              <span>{{item}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseButtonComponent from './CloseButton.vue'
import BgSwitchComponent from './BgSwitch.vue'

import { TweenMax, Linear, Power2 } from 'gsap'

export default {
  name: 'StoryMenu',
  props: {
    showMenu: Boolean
  },
  data () {
    return {
      stories: ['Liberia', 'Haiti', 'Kenya'],
      wh: 0,
      bg: 0,
      initialBg: 0
    }
  },
  methods: {
    mapPath: function (name) {
      var src = require('../assets/images/maps.svg')

      return src + '#' + name + '-filled'
    },
    viewBox: function (name) {
      switch (name) {
        case 'Haiti':
          return '0 0 237 165'
        case 'Liberia':
          return '0 0 190 197'
        case 'Kenya':
          return '0 0 132 158'
      }
    },
    enter: function (el, done) {
      TweenMax.fromTo(this.$refs.menu, 0.7, {scaleX: 0}, {scaleX: 1, ease: Power2.easeOut, overwrite: 5})

      var closeButton = this.$refs.menu.querySelector('.close-btn')
      TweenMax.fromTo(closeButton, 0.3, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut, overwrite: 5})

      var title = this.$refs.menu.querySelector('.story-menu__title')
      TweenMax.fromTo(title, 0.3, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut, overwrite: 5})

      var bgImage = this.$refs.menu.querySelector('.bg-switch')
      TweenMax.fromTo(bgImage, 0.3, {opacity: 0}, {opacity: 0.15, delay: 0.7, ease: Linear.easeInOut, overwrite: 5})

      var links = this.$refs.list.querySelectorAll('li')
      TweenMax.to(this.$refs.list, 0.01, {opacity: 1, ease: Linear.easeNone, overwrite: 5})
      for (var i = 0; i < links.length; i++) {
        var delay = 0.7 + (0.05 * i)
        TweenMax.fromTo(links[i], 0.5, {opacity: 0, y: -10}, {opacity: 1, y: 0, delay: delay, ease: Power2.easeOut, overwrite: 5})
      }

      done()
    },
    leave: function (el, done) {
      var closeButton = this.$refs.menu.querySelector('.close-btn')
      TweenMax.fromTo(closeButton, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})

      var title = this.$refs.menu.querySelector('.story-menu__title')
      TweenMax.fromTo(title, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})

      var bgImage = this.$refs.menu.querySelector('.bg-switch')
      TweenMax.fromTo(bgImage, 0.3, {opacity: 0.15}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})

      TweenMax.fromTo(this.$refs.list, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})

      TweenMax.fromTo(this.$refs.menu, 0.5, {scaleX: 1}, {scaleX: 0, delay: 0.3, ease: Power2.easeOut, overwrite: 5})
      setTimeout(function () {
        done()
      }, 1000)
    }
  },
  created () {
    this.initialBg = this.stories.findIndex(story => story === this.$route.name) + 1
  },
  mounted () {
    this.wh = window.innerHeight
    this.bg = this.initialBg
  },
  components: {
    CloseButtonComponent,
    BgSwitchComponent
  }
}
</script>

<style lang="scss">
.story-toggle{
  position: fixed;
  top: em(35);
  left: em(50);
  display: flex;
  z-index: 21;
  align-items: center;
  color: #FFF;
  cursor: pointer;

  &__title{
    color: #C6C6C6;
    margin-top: em(15, 40);
    font-size: em(40);
  }

  @media screen and (max-width: $mobile-breakpoint) {
    top: em(20);
    left: em(20);

    &__title{
      font-size: em(20);
    }
  }
}

.story-menu{
  position: fixed;
  z-index: 30;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: $color_body;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: right center;

  .bg-switch{
    opacity: 0.15;
  }

/*  &__close{
    font-size: em(18);
    cursor: pointer;
    position: absolute;
    top: em(35, 18);
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    border: none;
    padding: 0;
    color: #FFF;
    opacity: 0.5;
    z-index: 1;
  }*/

  &__content{
    position: relative;
    z-index: 1;
  }

  p{
    font-size: em(14);
    text-align: left;
    margin: 0 0 em(35, 14);
    padding-left: em(160, 14);
    color: #86888E;
  }

  ul{
    margin: 0;
    padding: 0;

    li{
      a{
        color: currentColor;
        text-decoration: none;
        display: flex;
        opacity: 0.08;
        transition: all 0.3s ease-in-out;

        &:hover{
          opacity: 0.2;
        }
      }

      &.active{
        a{
          opacity: 1;
          color: $color1;
        }
      }

      figure{
        width: em(110);
        height: em(90);
        margin-right: em(50);
        margin-top: em(10);
        text-align: right;
      }

      svg{
        width: auto;
        height: 90%;

      }

      span{
        font-family: $font_title;
        font-size: em(114);
        letter-spacing: em(-1.2, 114);
      }
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    p{
      font-size: em(12);
      padding-left: em(75, 12);
    }

    ul{
      li{
        margin: em(10) 0;

        figure{
          width: em(50);
          height: em(45);
          margin-right: em(25);
          margin-top: 0;
        }

        span{
          line-height: em(45, 40);
          font-size: em(40);
        }
      }
    }
  }
}

.fade-menu-enter-active, .fade-menu-leave-active {
  transition: opacity .5s;
}
.fade-menu-enter, .fade-menu-leave-to{
  opacity: 0;
}
</style>
