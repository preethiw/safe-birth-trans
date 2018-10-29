<template>
  <div class="gallery">
    <flickity ref="flickity" :options="{freeScroll: false, wrapAround: true, cellAlign: 'center', pageDots: false}" class="carousel-images">
      <slot></slot>
    </flickity>
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
          <div class="carousel-images__caption" ref="caption">
            <div class="carousel-images__current">{{index}} of {{total}}</div>
            <h4 class="title-h3">{{title}}</h4>
            <p v-html="text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from 'vue-flickity'
import {TweenMax, Power2} from 'gsap'

export default {
  name: 'Gallery',
  data () {
    return {
      index: 0,
      total: 0,
      title: '',
      text: ''
    }
  },
  methods: {
    updateGalleryCaption: function (ref, el) {
      let vm = this

      if ((ref.selectedIndex + 1) !== vm.index) {
        TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {
          y: 10,
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function e () {
            vm.index = ref.selectedIndex + 1
            vm.total = ref.cells.length
            vm.title = ref.selectedElement.querySelector('.carousel-images__text h4').innerText
            vm.text = ref.selectedElement.querySelector('.carousel-images__text p').innerHTML

            TweenMax.fromTo(el, 0.3, {y: 10, opacity: 0}, {y: 0, opacity: 1, ease: Power2.easeInOut})
          }
        })
      }
    }
  },
  mounted () {
    let vm = this

    var refGallery = vm.$refs.flickity.$flickity
    var el = this.$refs.caption
    vm.updateGalleryCaption(refGallery, el)
    refGallery.on('select', function () { vm.updateGalleryCaption(refGallery, el) })
  },
  components: {
    Flickity
  }
}
</script>

<style lang="scss">
.carousel-images{
  &__item{
    width: em(728);
    max-width: 100%;
    box-sizing: border-box;

    .carousel-images__text{
      display: none;
    }

    figure{
      width: 100%;
      height: 60vw;
      position: relative;

      &:after{
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      figcaption{
        position: absolute;
        right: 0;
        bottom: 0;
        text-align: right;
        padding: 0.5em;
        color: #000;
      }
    }

    &:not(.is-selected){
      figure{
        &:after{
          opacity: 0.4;
        }
      }
    }
  }

  &__current{
    font-size: em(18);
    line-height: em(29, 18);
    font-style: italic;
    color: #000000;
    letter-spacing: em(-0.12, 18);
    position: absolute;
    left: em(-20, 18);
    top: 0;
    transform: translateX(-100%);
  }

  &__caption{
    margin-top: em($margin_md);
    position: relative;

    .title-h3{
      color: $color2;
    }
  }

  .flickity-button{
    font-size: 1em;
    width: em(46);
    height: em(46);
    margin-top: em(-23);
    background-color: #FF146E;
    background-image: url(../assets/images/arrow-carousel.svg);
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: auto 18px;
    background-size: auto 18px;
    transition: background 0.3s ease-in-out;

    &.previous{
      left: em($margin_md + $margin_sm);
      transform: rotate(90deg);
    }

    &.next{
      right: em($margin_md + $margin_sm);
      transform: rotate(-90deg);
    }

    svg{
      display: none;
    }

    &:hover, &:active{
      opacity: 1;
      background-repeat: no-repeat;
      background-position: center;
      -webkit-background-size: auto 18px;
      background-size: auto 18px;
      background-image: url(../assets/images/arrow-carousel.svg);
      background-color: darken(#FF146E, 10%);
    }
  }

  @media screen and (min-width: $mobile_breakpoint){
    &__item{
      padding: 0 rem(10);
  
      figure{
        height: em(475);
      }
    }
  }

  .flickity-button{
    font-size: 80%;

    &.previous{
      left: em($margin_md);
    }

    &.next{
      right: em($margin_md);
    }
  }
}
</style>
