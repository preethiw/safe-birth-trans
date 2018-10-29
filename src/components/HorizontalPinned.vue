<template>
  <section class="horizontal-pinned">
    <div class="horizontal-pinned__container" ref="container">
      <div class="clock" ref="clock"><span class="clock__line"></span><span class="clock__icon"></span></div>
      <figure :style="{'background-image': 'url(' + bg + ')'}"></figure>
      <div class="horizontal-pinned__text" ref="text">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import { TimelineMax, TweenMax, Linear } from 'gsap'
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'

export default {
  name: 'HorizontalPinned',
  props: {
    bg: String
  },
  data () {
    return {
      controller: null,
      wh: 0
    }
  },
  methods: {
    initParallax: function () {
      this.controller = new ScrollMagic.Controller()

      if (this.$root.isMobile) return

      var el = this.$refs.container

      var tween = new TimelineMax()
        .add([
          TweenMax.fromTo(this.$refs.text, 0.3, {x: '150%'}, {x: '-100%', ease: Linear.easeInOut})
        ])

      new ScrollMagic.Scene({triggerElement: el, triggerHook: 'onLeave', duration: this.wh * 1})
        .setPin(el)
        .setTween(tween)
        .addTo(this.controller)

      var line = this.$refs.clock.querySelector('.clock__line')
      var icon = this.$refs.clock.querySelector('.clock__icon')

      this.buildTween(el, line, 0.3, {scaleY: 0}, {scaleY: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.2, this.wh * 0.5)
      this.buildTween(el, icon, 0.3, {opacity: 0}, {opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.6, 0)
    },
    buildTween: function (ref, el, speed, from, to, trigger, offset, duration) {
      var tween = new TimelineMax()
        .add([
          TweenMax.fromTo(el, speed, from, to)
        ])

      var scene = new ScrollMagic.Scene({triggerElement: ref, triggerHook: trigger, offset: offset, duration: duration})
        .setTween(tween)
        .addTo(this.controller)

      return scene
    }
  },
  destroyed () {
    this.controller = this.controller.destroy(true)
  },
  mounted () {
    this.wh = window.innerHeight
    this.$nextTick(this.initParallax())
  }
}
</script>

<style lang="scss">
.horizontal-pinned{
  /*overflow: hidden;*/

  &__container{
    height: 100vh;
    position: relative;
  }

  figure{
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    -webkit-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
  }

  &__text{
    white-space: nowrap;
    position: absolute;
    z-index: 1;
    left: 0%;
    top: 50%;
    transform: translateY(-50%);
    color: #FFF;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &__container{
      height: auto;
    }

    figure{
      height: 90vw;
      position: static;
      background-attachment: initial;
    }

    &__text{
      position: static;
      white-space: normal;
      transform: none;
      color: currentColor;
      padding: 0 em(20);
      margin: em(40) 0;
    }
  }
}

.clock{
  position: absolute;
  left: 50%;
  transform: translate(-50%, -108px);
  color: $color1;
  z-index: 0;

  &__line{
    content: "";
    display: block;
    margin: 0 auto;
    width: 1px;
    height: 50vh;
    background-color: currentColor;
    transform-origin: center top;
  }

  &__icon{
    display: block;
    width: em(216);
    height: em(216);
    border-radius: 50%;
    color: currentColor;
    border: 1px solid currentColor;
    position: relative;

    &:before{
      content: "";
      display: block;
      width: 1px;
      height: em(10);
      background-color: currentColor;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
    }

    &:after{
      content: "";
      display: block;
      width: em(30);
      height: em(7);
      border: 1px solid currentColor;
      position: absolute;
      top: em(-10);
      left: 50%;
      transform: translate(-50%, -100%);
      box-sizing: border-box;
      border-radius: em(3, 14)
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    font-size: 1.5vh;
    transform: translate(-50%, -10%);

    &__line{
      height: 40vw;
    }
  }
}
</style>
