<template>
  <transition v-on:enter="enter" v-on:leave="leave">
    <menu class="full-menu" ref="menu" v-show="$root.menuOpened">
      <div class="full-menu__overlay" v-on:click="$root.menuOpened = false"></div>
      <close-button-component v-on:toggle="$root.menuOpened = false"></close-button-component>
      <ul ref="list">
        <li><router-link to="/" :class="{active: $route.name == 'Home'}">Home</router-link></li>
        <li><router-link to="/map" :class="{active: $route.name == 'Map'}">Map</router-link></li>
        <li><router-link to="/haiti" :class="{active: $route.name == 'Haiti'}">Haiti</router-link></li>
        <li><router-link to="/liberia" :class="{active: $route.name == 'Liberia'}">Liberia</router-link></li>
        <li><router-link to="/kenya" :class="{active: $route.name == 'Kenya'}">Kenya</router-link></li>
        <li><router-link to="/closing" :class="{active: $route.name == 'Closing' || $route.name == 'Action'}">Take Action</router-link></li>
      </ul>
      <sharing-component></sharing-component>
    </menu>
  </transition>
</template>

<script>
import CloseButtonComponent from './CloseButton'
import SharingComponent from './Sharing'

import { TweenMax, Linear, Power2 } from 'gsap'

export default {
  name: 'Navigation',
  data () {
    return {
      lastScroll: 0,
      sticky: true,
      top: 0
    }
  },
  methods: {
    toggleMenu: function () {
      this.$root.menuOpened = !this.$root.menuOpened
      // this.$root.menuOpened = true
    },
    getScrollDirection: function (currentScroll) {
      var direction = currentScroll > this.lastScroll ? 'down' : 'up'
      this.lastScroll = currentScroll
      return direction
    },
    checkScroll: function () {
      this.top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
      // var scrollDirection = this.getScrollDirection(top)
      // var limit = this.$refs.nav.offsetHeight

      // if (top > limit) {
      //   this.$root.scrolled = true
      // } else {
      //   this.$root.scrolled = false
      // }
    },
    enter: function (el, done) {
      var closeButton = this.$refs.menu.querySelector('.close-btn')
      TweenMax.fromTo(closeButton, 0.3, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut, overwrite: 5})

      var sharingMenu = this.$refs.menu.querySelector('.sharing-menu')
      TweenMax.fromTo(sharingMenu, 0.3, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut, overwrite: 5})

      var links = this.$refs.list.querySelectorAll('li')

      TweenMax.to(this.$refs.list, 0.01, {opacity: 1, ease: Linear.easeNone, overwrite: 5})
      for (var i = 0; i < links.length; i++) {
        var delay = 0.5 + 0.05 * i
        TweenMax.fromTo(links[i], 0.5, {opacity: 0, x: 10}, {opacity: 1, x: 0, delay: delay, ease: Power2.easeOut, overwrite: 5})
      }
      TweenMax.fromTo(this.$refs.menu, 0.5, {scaleX: 0}, {scaleX: 1, ease: Power2.easeOut, overwrite: 5})
      done()
    },
    leave: function (el, done) {
      var closeButton = this.$refs.menu.querySelector('.close-btn')
      TweenMax.fromTo(closeButton, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})
      var sharingMenu = this.$refs.menu.querySelector('.sharing-menu')
      TweenMax.fromTo(sharingMenu, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})
      TweenMax.fromTo(this.$refs.list, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut, overwrite: 5})
      TweenMax.fromTo(this.$refs.menu, 0.3, {scaleX: 1}, {scaleX: 0, delay: 0.3, ease: Power2.easeOut, overwrite: 5})
      setTimeout(function () {
        done()
      }, 1000)
    }
  },
  computed: {
    hideLogo: function () {
      if ((this.$route.name === 'Liberia' || this.$route.name === 'Kenya' || this.$route.name === 'Haiti') && this.top >= 50) {
        return true
      } else {
        return false
      }
    },
    scrolled: function () {
      var scrolled = true

      // var scrolled = false
      // if (this.$root.scrolled || this.$root.menuOpened) {
      // if (this.$root.scrolled) {
      //   scrolled = true
      // }

      return scrolled
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.checkScroll)
  },
  created () {
    window.addEventListener('scroll', this.checkScroll)
  },
  components: {
    CloseButtonComponent,
    SharingComponent
  }
}
</script>

<style lang="scss" scoped>
.full-menu{
  position: fixed;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 30;
  display: flex;
  background-color: $color_body;
  align-items: center;
  justify-content: flex-end;
  padding: 0 em(50);
  box-sizing: border-box;
  transform-origin: center right;

  &__overlay{
    position: fixed;
    width: 50vw;
    height: 100%;
    right: 50vw;
    top: 0;
    z-index: -1;
  }

  @media screen and (min-width: $mobile-breakpoint + 1) {
    &:after{
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 50%;
      background-image: -webkit-linear-gradient(272deg, #0C1020 20%, rgba(12,16,32,0.00) 86%);
      background-image: -o-linear-gradient(272deg, #0C1020 20%, rgba(12,16,32,0.00) 86%);
      background-image: linear-gradient(2deg, #0C1020 20%, rgba(12,16,32,0.00) 86%);
      pointer-events: none;
    }
  }

  .sharing-menu{
    color: #FFF;
    position: absolute;
    left: em(50);
    top: em(50);
  }

  ul{
    padding: 0;
    margin: 0;

    li{
      font-family: $font_title;
      display: block;
      font-size: em(80);
      line-height: em(100, 80);
      text-align: right;

      a{
        color: #FFF;
        opacity: 0.1;
        text-decoration: none;
        transition: all 0.3s ease-in-out;

        &:hover{
          opacity: 0.4;
        }

        &.active{
          color: $color1;
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    width: 100%;
    padding: 0 em(20);
    /*justify-content: flex-start;*/

    ul{
      width: 100%;

      li{
        text-align: center;
        font-size: em(30);
        line-height: em(50, 30);
      }
    }

    .sharing-menu{
      font-size: em(12);
      width: 100%;
      top: auto;
      bottom: em(30, 12);
      left: 0;
      text-align: center;
    }
  }
}

.menu-transition-enter-active, .menu-transition-leave-active {
  transition: opacity .5s;
}
.menu-transition-enter, .menu-transition-leave-to{
  opacity: 0;
}

/*.menu-transition-enter-active{
  transition-delay: 1s;
}*/
</style>
