<template>
  <!-- <div class="gallery" @mousemove="updateMousePosition" @mouseenter="mouseEnter" @mouseleave="mouseLeave" v-on:click="next"> -->
  <div class="gallery">
    <div class="gallery__wrap">
      <!-- <button class="gallery__next" ref="button"><span>Next image</span></button> -->
      <flickity ref="flickity" :options="{freeScroll: false, wrapAround: true, cellAlign: 'center', pageDots: true, prevNextButtons: true}" class="carousel-images carousel-default" >
        <slot></slot>
      </flickity>
    </div>
    <p class="gallery__caption" ref="caption" v-html="legend"></p>
  </div>
</template>

<script>
import Flickity from 'vue-flickity'
import {TweenMax, Power2} from 'gsap'

export default {
  name: 'Gallery',
  data () {
    return {
      legend: ''
    }
  },
  methods: {
    // next: function () {
    //   var refGallery = this.$refs.flickity.$flickity
    //   refGallery.next()
    // },
    // updateMousePosition: function (e) {
    //   if (this.$root.isMobile) return
    //   var buttonContainer = this.$el

    //   if (e.clientX >= buttonContainer.getBoundingClientRect().left &&
    //       e.clientX <= (buttonContainer.getBoundingClientRect().left + buttonContainer.offsetWidth) &&
    //       e.clientY >= buttonContainer.getBoundingClientRect().top &&
    //       e.clientY <= (buttonContainer.getBoundingClientRect().top + buttonContainer.offsetHeight)) {
    //     var x = 0.8 * (e.clientX - buttonContainer.getBoundingClientRect().left + 55)
    //     var y = 0.8 * (e.clientY - buttonContainer.getBoundingClientRect().top + 10)

    //     TweenMax.to(this.$refs.button, 0.2, {
    //       x: x + 'px',
    //       y: y + 'px',
    //       ease: Linear.easeNone
    //     })
    //   }
    // },
    // mouseEnter: function () {
    //   if (this.$root.isMobile) return
    //   TweenMax.to(this.$refs.button, 0.3, {
    //     opacity: 1,
    //     ease: Linear.easeNone
    //   })
    // },
    // mouseLeave: function () {
    //   if (this.$root.isMobile) return
    //   TweenMax.to(this.$refs.button, 0.3, {
    //     opacity: 0,
    //     ease: Linear.easeNone
    //   })
    // },
    updateGalleryCaption: function (ref, el) {
      let vm = this
      if ((ref.selectedIndex + 1) !== vm.index) {
        TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {
          y: 10,
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function e () {
            vm.legend = ref.selectedElement.querySelector('p').innerHTML
            TweenMax.fromTo(el, 0.3, {y: '105%', opacity: 0}, {y: '100%', opacity: 1, ease: Power2.easeInOut})
          }
        })
      }
    }
    // galleryClick: function (e) {
    //   if (!e.target.className.includes('dot')) {
    //     this.next()
    //   }
    // },
    // setInitialPos: function () {
    //   if (this.$root.isMobile) return
    //   var button = this.$refs.button
    //   var x = this.$el.offsetWidth - button.offsetWidth - 50
    //   var y = (this.$el.offsetHeight / 2) - (button.offsetHeight / 2)

    //   TweenMax.to(button, 0.7, {x: x, y: y, ease: Power2.easeInOut})
    // }
  },
  mounted () {
    let vm = this
    var el = this.$refs.caption
    var refGallery = this.$refs.flickity.$flickity

    // this.setInitialPos()

    vm.updateGalleryCaption(refGallery, el)
    refGallery.on('select', function () {
      vm.updateGalleryCaption(refGallery, el)
    })
  },
  components: {
    Flickity
  }
}
</script>

<style lang="scss">
.gallery{
  position: relative;
  margin-bottom: em(300);

  &__next{
    font-size: em(24);
    position: absolute;
    z-index: 10;
    width: em(110, 24);
    height: em(110, 24);
    /*top: 50%;
    right: em(30);
    transform: translateY(-50%);*/
    opacity: 1;
    border: none;
    padding: 0;
    background: none;
    font-family: $font_title;
    color: #FFF;
    cursor: pointer;

    &:before{
      content: "";
      display: block;
      width: em(30, 24);
      height: em(30, 24);
      border-top: 1px solid currentColor;
      border-right: 1px solid currentColor;
      margin: 0 auto em(20, 24);
      transform: rotate(45deg);
    }
  }

  /*&__wrap{
    *{
      cursor: none !important;
    }
  }*/

  @media screen and (max-width: $mobile-breakpoint) {
    &__next{
      opacity: 1;
      left: auto;
      right: em(-15);
      top: 50%;
      transform: translateY(-50%);

      span{
        display: none;
      }
    }
  }

  &__caption{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: em(14);
    width: 55%;
    padding: em(30, 14);
    margin: 0;
    transform: translateY(100%);
    text-align: right;

    span{
      display: inline-block;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(50) 0 em(150);
    &__caption{
      width: 100%;
      text-align: left;
      bottom: em(-30);
      font-size: em(12);
      box-sizing: border-box;
      //padding: em(20) $mobile_padding;
      padding: $mobile_padding;
      padding-top:em(20);
      span{
        display: none;
      }
    }
  }
}

.carousel-images{
  &__item{
    width: 100%;
    box-sizing: border-box;

    /**{
      cursor: none !important;
    }*/

    figure{
      padding-top: 80vh;
      background-size: cover;
      background-position: center;
    }

    p{
      display: none;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &__item{
      figure{
        padding-top: 90%;
      }
    }
  }
}
</style>
