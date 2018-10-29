<template>
  <main class="wrap story-single" :class="{menuOpened: $root.menuOpened, scrolleable: $root.isMobile, ie: $root.testBrowser('ie')}">
    <!-- <story-menu-component></story-menu-component> -->
    <story-header-component></story-header-component>
    <slot></slot>
    <!-- <section class="story-action margin-small">
      <div class="container">
        <div class="row center-xs">
          <div class="col-xs-12">
            <router-link class="btn-circles" to="/closing">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" ref="circleSvg"><circle cx="50" cy="50" r="47" stroke="currentColor" fill="none"/></svg>
              <div class="btn-circles__content">Take action</div>
            </router-link>
          </div>
        </div>
      </div>
    </section> -->
    <div class="other-stories">
      <div class="other-stories__item other-stories__kenya" v-if="nextStory('/kenya')">
        <router-link to="/Kenya">
          <div class="other-stories__container">
            <h4>Next story</h4>
            <h5 class="title-h3">Kenya</h5>
          </div>
          <figcaption class="image-credit">
            © UNFPA Kenya/ Douglas Waudo
          </figcaption>
        </router-link>
      </div>
      <div class="other-stories__item other-stories__haiti" v-if="nextStory('/haiti')">
        <router-link to="/Haiti">
          <div class="other-stories__container">
            <h4>Next story</h4>
            <h5 class="title-h3">Haiti</h5>
          </div>
          <figcaption class="image-credit">
            © UNFPA/Elena Heatherwick
          </figcaption>
        </router-link>
      </div>
      <div class="other-stories__item other-stories__liberia" v-if="nextStory('/liberia')">
        <router-link to="/Liberia">
          <div class="other-stories__container">
            <h4>Next story</h4>
            <h5 class="title-h3">Liberia</h5>
          </div>
          <figcaption class="image-credit">
            © UNFPA/Elena Heatherwick
          </figcaption>
        </router-link>
      </div>
      <div class="other-stories__item other-stories__action" v-if="nextStory('/closing')">
        <router-link to="/closing">
          <div class="other-stories__container">
            <h5 class="title-h3">Take action</h5>
          </div>
          <figcaption class="image-credit">
            © Lynsey Addario for Time
          </figcaption>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import StoryHeaderComponent from './StoryHeader.vue'
import StoryMenuComponent from './StoryMenu.vue'

import { TweenMax, Linear } from 'gsap'

export default {
  name: 'Stories',
  props: {
    title: String
  },
  data () {
    return {
    }
  },
  methods: {
    nextStory: function (story) {
      var current = this.$root.menuOrder.indexOf(this.$route.path.toLowerCase())
      var next = this.$root.menuOrder[current + 1]
      document.querySelector('#app').classList.remove('hide-header')
      if (next === story) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.$root.historyBack) {
      TweenMax.to(window, 0.01, {
        scrollTo: { y: 10000, autoKill: true },
        ease: Linear.easeNone,
        overwrite: 5
      })

      this.$root.historyBack = false
    }
  },
  components: {
    StoryHeaderComponent,
    StoryMenuComponent
  }
}
</script>

<style lang="scss">
.story-single{
  overflow: hidden;

  .btn-circles{
    margin: em(50) auto;
    font-size: em(20);

    @media screen and (min-width: $mobile-breakpoint + 1) {
      font-size: em(40);
    }
  }
  .final-credits{
    display: none;
    font-size: em(10);
    margin-bottom: 0;
    margin-top: 5em;
  }
  &.ie{
    .other-stories .other-stories__item{
      padding-top: 317px !important;
    }
  }
  @media screen and (max-width: 1400px) {
    .little-xs{
      font-size: em(58);
    }
  }
  @media screen and (max-width: 1250px) {
    .little-xs{
      font-size: em(50);
    }
  }
  @media screen and (max-width: 1050px) {
    .little-xs{
      font-size: em(41);
    }
  }
  @media screen and (max-width: $mobile-breakpoint) {
    .little-xs{
      font-size: em(21);
    }
    .title-h3, .title-h4{
      font-size: em(30);
      line-height: em(35, 30);
      letter-spacing: em(-0.15, 20);
    }
    .title-h2{
      font-size: em(26);
      line-height: em(25, 26);
      letter-spacing: em(-0.15, 26);
      &:first-child:not(:last-child){
        margin-bottom: em(20);
      }
    }
    .final-credits{
      display: block;
    }
    .container .row .col-xs-12{
      padding-right: $mobile_padding;
      padding-left: $mobile_padding;
    }
    .image-credit{
      display: none;
    }
  }
}
section.share{
  padding-top: em(35);
  + section{
    text-align: center;
  }
}
.video{
  div[class|=col]{
    position: relative;
  }

  &__share{
    position: absolute;
    z-index: 5;
    top: em(40);
    right: em(30);
  }
  + section.share{
    display: none;
  }
  @media screen and (max-width: $mobile-breakpoint) {
    div[class|=col]{
      width: 100%;
    }
    .container {
      padding: 0 $mobile_padding;
      > .row{
        width: 100%;
        margin: 0;
      }
    }
    &__share{
      display: none;
    }
    + section.share{
      display: flex;
    }

  }
}

.margin-default{
  margin: em(200) 0;
  position: relative;

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(60) 0;
  }
}

.margin-small{
  margin: em(75) 0;
  position: relative;

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(50) 0;
  }
}

.p-div{
  margin: em(60) auto;
  border-top: 1px solid #A4A4A4;
  border-bottom: none;
  width: em(120);

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(20) auto;
  }
}

/*.story-action{
  margin-bottom: em(50);
}*/

.image-floating{

  .container{
    position: relative;
  }

  &__text{
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 14.5vw;
    width: 30vw;
    transform: translateY(-50%);
  }

  .gallery{
    width: 100%;
  }

  figure{
    width: 65vw;
    margin-left: auto;
    position: relative;

    img{
      width: 100%;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &__text{
      position: static;
      width: auto;
      transform: none;
      margin: em(40) 0;
      padding: 0 em(20);
    }

    figure{
      width: 100%;
    }
  }
}

.image-animation{
  @media screen and (max-width: $mobile-breakpoint) {
    &__text{
      padding: 0 $mobile_padding;
      margin-top: 3.2rem;
      p{
        margin: 0;
      }
    }
  }

  @media screen and (min-width: $mobile-breakpoint + 1) {
    figure{
      position: relative;
    }

    &__container{
      position: relative;
    }

    &__overlay{
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: $color_body;
      transform-origin: left center;
      z-index: 1;

      &--right{
        transform-origin: right center;
      }
    }

    .image-credit{
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateY(100%);
    }
  }
}

.hero-text{
  position: relative;
  background-color: #000;
  color: #FFF;

  figure{
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    opacity: 0.8;
    -webkit-transform: rotateY(0deg);
  }

  p{
    margin: 0;
  }

  .row{
    height: 100vh;
    position: relative;
    z-index: 1;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    background-color: transparent;
    color: currentColor;

    figure{
      position: static;
      height: 90vw;
      background-attachment: initial;
      opacity: 1;
      margin: em(20) 0;
    }
  }

  .image-credit{
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    color: $color_body;
    z-index: 1;
  }
}
.nested-on-mobile{
  @media screen and (max-width: $mobile-breakpoint) {
    .container{
      height: 100%;
      position: absolute;
      top: 0;
      color: white;
      display: flex;
      align-items: center;
    }
    .row{
      height: auto;
    }
    .col-xs-12{
      padding-right: 2.8rem;
      padding-left: 2.8rem;
    }
    figure{
      position: relative;
      &::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: black;
        opacity: 0.3;
        z-index: 0;
      }
    }
  }
}
.image-credit{
  font-size: em(12);
  line-height: 1em;
  padding: em(20) em(40);
  text-align: right;
}

.other-stories{
  padding: 0;
  text-align: center;
  background-color: $color_body;

  &__kenya:before{
    background-image: url(../assets/images/kenya-thumbnail.jpg);
  }

  &__liberia:before{
    background-image: url(../assets/images/liberia-thumbnail.jpg);
  }

  &__haiti:before{
    background-image: url(../assets/images/haiti-thumbnail.jpg);
  }

  &__action:before{
    background-image: url(../assets/images/closing-bg.jpg);
    opacity: 0.25;
  }

  h4{
    font-size: em(18);
    margin: 0 0 em(25, 18);
    font-weight: normal;
    width: 100%;
    font-family: $font_base;
  }

  &__item{
    width: 100%;
    padding-top: 24%;
    position: relative;
    overflow: hidden;
    
    h5{
      &:after{
        content: "";
        display: block;
        border-bottom: 1px solid currentColor;
        transform: scale(0, 1);
        transition: transform 0.3s ease-in-out;
      }
    }

    &:hover{
      h5:after{
        transform: scale(1, 1);
      }
    }

    &:before{
      content: "";
      display: block;
      -webkit-background-size: cover;
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: transform 1.5s ease-out;
    }

    a{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #FFF;
      text-decoration: none;
    }

    &:hover{
      &:before{
        transform: scale(1.05);
      }
    }

    .image-credit{
      position: absolute;
      right: em(30);
      bottom: em(30);
    }
  }

  &__container{
    &:after{
      content: "";
      display: block;
      width: em(30);
      height: em(40);
      background: url(../assets/images/arrow-down.svg) no-repeat center;
      background-size: contain;
      margin: em(30) auto 0;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    .image-credit{
      display: none;
    }
    .other-stories__container:after{
      width: em(12);
      margin-top: auto;
      margin-bottom: em(-22);
    }
    h4{
      font-size: em(12);
      position: relative;
      bottom: auto;
      margin: 0;
      z-index: 1;
    }
    .title-h3{
      font-size: em(18);
    }

    &__item{
      padding-top: 35%;

      a{
        font-size: em(20);
      }
    }
  }
}
</style>
