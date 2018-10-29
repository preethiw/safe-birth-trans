<template>
  <transition name="fade">
    <div class="popup" v-show="openedClass">
      <div class="popup__overlay" ref="body" v-on:click="close"></div>
      <close-button-component class="popup__close" v-on:toggle="close"></close-button-component>
      <div class="popup__body" ref="body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseButtonComponent from './CloseButton.vue'

export default {
  name: 'Popup',
  props: {
    openedClass: Boolean
  },
  methods: {
    close: function () {
      this.$root.popupOpened = false
      this.$emit('close')
      // var inputs = this.$refs.body.querySelectorAll('input')
      // for (var i = 0; i < inputs.length; i++) {
      //   inputs[i].value = ''
      // }
    }
  },
  data () {
    return {
      lastScroll: 0
    }
  },
  watch: {
    'openedClass': function () {
      this.$root.popupOpened = this.openedClass

      if (this.openedClass) {
        if (window.innerHeight < 780) {
          this.$refs.body.addEventListener('mousewheel', function (e) { e.stopPropagation() })
        }
        if (document.scrollingElement) {
          this.lastScroll = document.scrollingElement.scrollTop
        }
        document.querySelector('html').classList.add('overflow-hidden')
      } else {
        document.querySelector('html').classList.remove('overflow-hidden')
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = this.lastScroll
        }
      }
    }
  },
  components: {
    CloseButtonComponent
  }
}
</script>

<style lang="scss">
.popup{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  &__overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.9;
  }

  /*&-action{
    .popup__overlay{
      background: url(../assets/images/bg-popup.jpg) #000 no-repeat center;
      -webkit-background-size: cover;
      background-size: cover;
    }
  }*/

  &__body{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
  }

  &__close{
    position: absolute;
    right: em(20);
    top: em(30);
    /*font-size: em(18);
    line-height: 1em;
    letter-spacing: em(0.3, 18);
    padding: 0;
    border: none;
    background: transparent;
    transform: rotate(-90deg) translate(-50%, 100%);
    transform-origin: center;
    cursor: pointer;*/
  }

  &__content{
    padding: em(80) em(100);
    background-color: #fff;
    text-align: center;
    width: em(730);
    box-sizing: border-box;
  }
  @media screen and (max-height: 780px) {
    &__body{
      height: 100%;
      overflow-y: auto;
      background: white;
      .popup__content{
        padding-bottom: 0 !important;
        .btn--default:last-child{
          margin-bottom: 3.75em;
        }
      }
    }
  }
  @media screen and (max-width: $mobile_breakpoint) {
    height: 100%;
    overflow: hidden;

    &__body{
      left: 0;
      top: 0;
      transform: none;
      padding: 0;
      box-sizing: border-box;
      width: calc(100% - 40px);
      margin: 20px;
      height: calc(100% - 125px);
      overflow-y: auto;
      margin-top: 105px;
    }

    &__content{
      padding: em(40) em(20);
      width: 100%;
      .btn--default, .btn--primary {
        font-size: em(18);
        padding: 17px;
      }
    }
  }

  .flickity-prev-next-button{
    font-size: em(24);
    position: absolute;
    z-index: 10;
    width: em(110, 24);
    height: em(110, 24);
    opacity: 1;
    border: none;
    padding: 0;
    background: none;
    font-family: $font_title;
    color: #0B0B0B;
    cursor: pointer;

    &:hover{
      background: transparent;
    }

    svg{
      display: none;
    }

    &:before{
      content: "";
      display: block;
      width: em(30, 24);
      height: em(30, 24);
      margin: 0 auto em(20, 24);
      transform: rotate(45deg);
    }

    &.next{
      right: em(-50);
      &:before{
        border-top: 1px solid currentColor;
        border-right: 1px solid currentColor;
      }
    }

    &.previous{
      left: em(-50);

      &:before{
        border-bottom: 1px solid currentColor;
        border-left: 1px solid currentColor;
      }
    }
  }

  .flickity-page-dots{
    font-size: 1em;
    bottom: em(-50);
    left: 0;
    text-align: center;
    width: 100%;

    .dot{
      color: #CECECE;
      width: em(46);
      height: auto;
      padding: em(10) 0;
      background: transparent;
      opacity: 1;
      margin: 0 em(5) 0 0;

      &:before{
        content: "";
        display: block;
        border-bottom: 1px solid currentColor;
      }

      &.is-selected{
        color: #030303;
      }
    }

    /** {
      cursor: pointer !important;
    }*/

    @media screen and (max-width: $mobile-breakpoint) {
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 50%;
    }
  }
}

.popup-sharing{
  @media screen and (max-width: $mobile_breakpoint) {
    .popup__body{
      background-color: white;
    }
  }

  .popup__content{
    width: em(880);
    @media screen and (max-width: $mobile_breakpoint) {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

  }

  .flickity-slider{
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: $mobile_breakpoint) {
      align-items: flex-start;
    }
  }

  &__card{
    width: 100%;
    /*height: 100%;*/
  }

  p{
    /*margin: 0;*/

    span{
      color: #A9A9A9;
    }

    @media screen and (min-width: $mobile_breakpoint + 1) {
      font-size: em(30);
      line-height: em(45, 30);
      font-weight: 300;
    }
    @media screen and (max-width: $mobile_breakpoint) {
      text-align: left;
      margin-top: 0;
      font-size: em(20);
    }
  }
  .buttons{
    display: flex;
    flex-wrap: wrap;
    .btn{
      width: calc(50% - 2em);
      margin: 0 em(10);
    }
    @media screen and (max-width: $mobile_breakpoint) {
      display: block;
      padding-bottom: 20px;
      .btn{
        width: 100%;
        margin: 0;
        margin-top: 10px;
      }
    }
  }

  .carousel-share{
    margin-bottom: em(30);
    @media screen and (max-width: $mobile_breakpoint) {
      .flickity-prev-next-button{
        display: none;
      }
    }
  }

  .flickity-page-dots{
    bottom: em(0);
    @media screen and (max-width: $mobile_breakpoint) {
      bottom: -2em;
    }
  }
}
</style>
