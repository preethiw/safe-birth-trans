<template>
  <stories-component v-bind:title="'Haiti'">
    <section class="container margin-default image-animation">
      <div class="row middle-md">
        <div class="col-md-4 col-md-offset-1 col-xs-12">
          <blockquote class="blockquote-default image-animation__text" ref="text1">
            <p class="blockquote-default__text">I can work to save my people.</p>
            <!-- <p class="blockquote-default__cite">Yamah, a midwife and supervisor of a maternal health clinic</p> -->
          </blockquote>
        </div>
        <div class="col-md-7 col-xs-12">
          <figure class="image-animation__container">
            <div class="image-animation__overlay image-animation__overlay--right"></div>
            <img src="../assets/images/liberia-img1.jpg" alt="" class="image-animation__image" width="100%">
            <figcaption class="image-credit">
              © UNFPA/Elena Heatherwick
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
    <!-- <section class="image-floating margin-default image-animation">
      <div class="image-floating__text">
        <blockquote class="blockquote-default image-animation__text" ref="text1">
          <p class="blockquote-default__text">I can work to save my people.</p>
          <p class="blockquote-default__cite">— Yamah, a midwife and supervisor of a maternal health clinic</p>
        </blockquote>
      </div>
      <figure class="image-animation__container">
        <div class="image-floating__overlay image-animation__overlay image-animation__overlay--right"></div>
        <img src="../assets/images/liberia-img1.jpg" alt="" class="image-animation__image">
      </figure>
    </section> -->
    <section class="hero-text nested-on-mobile" ref="hero1">
      <!-- <div class="clock" ref="clock"><span class="clock__line"></span><span class="clock__icon"></span></div> -->
      <div class="container">
        <div class="row center-xs middle-xs">
          <div class="col-md-8 col-xs-12">
            <p class="title-h4" ref="text2">Midwife and clinic supervisor Yamah risked her own life to deliver babies during the Ebola outbreak.</p>
          </div>
        </div>
      </div>
      <figure class="hero-liberia"></figure>
      <figcaption class="image-credit">
        © UNFPA/Elena Heatherwick
      </figcaption>
    </section>
    <section class="fixedText" ref="fixedText">
      <div class="container">
        <div class="row center-sm middle-xs">
          <div class="col-xs-12 col-xl-12 col-sm-6 col-md-7 col-lg-8">
            <p class="title-h2 little-xs" ref="fixedText_title1">
              The epidemic devastated Liberia’s fragile healthcare system.
              <br>Maternal deaths surged.
            </p>
            <p class="title-h2 fixedText__title2 little-xs" ref="fixedText_title2">But even here, midwives like Yamah persevered in tending to mothers and their newborns.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="margin-default">
      <div class="container">
        <div class="row end-md">
          <div class="col-md-7 col-xs-12" ref="text3">
            <p class="title-h4">
              The epidemic devastated Liberia’s fragile healthcare system.
              <br>Maternal deaths surged.
            </p>
            <h3 class="title-h4">But even here, midwives like Yamah persevered in tending to mothers and their newborns.</h3>
          </div>
        </div>
      </div>
    </section> -->
    <section class="margin-default">
      <div class="image-animation">
        <div class="col-md-8 liberia-gallery image-animation__container">
          <div class="image-animation__overlay"></div>
          <next-gallery-component class="image-animation__image">
            <div class="carousel-images__item">
              <figure class="gallery-item1"></figure>
              <p>Clinic supervisor Yamah Siafa set an example for her fellow midwives during the Ebola outbreak, going in to treat patients when others were too scared. Over 400 doctors and nurses died while treating patients during the epidemic. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
            <div class="carousel-images__item">
              <figure class="gallery-item2"></figure>
              <p>Midwife  Georgetta Gbelly   sits with patients at   the UNFPA-supported Sinje Health Centre clinic in  Grand Cape Mount County, Liberia. During the outbreak, many pregnant women stopped going to clinics out of fear of catching Ebola, and mortality rose as more birth complications went untreated. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
            <div class="carousel-images__item">
              <figure class="gallery-item3"></figure>
              <p>Maternal mortality is higher among poor women worldwide. In Liberia, the poorest women are less than half as likely as the richest to have a skilled attendant help them deliver their babies. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
            <div class="carousel-images__item">
              <figure class="gallery-item4"></figure>
              <p>Midwife  Gbelly  takes a moment to fill out paperwork. UNFPA, with funding from Johnson & Johnson, is supporting Liberia to expand and train its midwifery workforce. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
            <div class="carousel-images__item">
              <figure class="gallery-item5"></figure>
              <p>Liberia is one of the focus countries for UNFPA’s provision of essential medicines and supplies for safe delivery and other maternal health needs. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
            <div class="carousel-images__item">
              <figure class="gallery-item6"></figure>
              <p>Midwife  Gbelly  hands 21-year-old Bendu her newborn daughter. After the baby is delivered, midwives provide post-natal care and support to new mothers. <span>© UNFPA/Elena Heatherwick</span></p>
            </div>
          </next-gallery-component>
        </div>
      </div>
    </section>
    <section class="video margin-small">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="video__share">
              <share-button-component v-on:click="sharing_video = true" class="light"></share-button-component>
            </div>
            <video-component v-bind:src="require('../assets/videos/liberia_full.mp4')" v-bind:cover="require('../assets/images/cover-video2.jpg')" v-bind:fullmode="false" v-bind:title="'Courage to save lives'"></video-component>
          </div>
        </div>
      </div>
    </section>
    <section class="share margin-small row center-xs">
      <share-button-component v-on:click="sharing_video = true" class="vertical"></share-button-component>
    </section>
    <!-- <div class="margin-default">
      <div class="equipments">
        <div class="container">
          <div class="row middle-xs center-xs">
            <div class="col-md-6">
              <p>With support from Johnson Johnson, UNFPA is working to equip midwives with the skills they need to ensure safe birth.</p>
              <ul class="equipments__menu">
                <li><a :class="{active: current==1}" v-on:mouseover="current = 1">equipped clinic</a></li>
                <li><a :class="{active: current==2}" v-on:mouseover="current = 2">unequipped clinic</a></li>
              </ul>
            </div>
          </div>
        </div>
        <bg-switch-component v-bind:current="current" v-bind:backgrounds="['img-unequipped.jpg', 'cover-video1.jpg']"></bg-switch-component>
      </div>
    </div> -->
    <section class="margin-small">
      <div class="container">
        <div class="row center-md middle-xs">
          <div class="col-md-7 col-xs-12" ref="text4">
            <p class="lead">Most maternal deaths can be prevented with skilled care before, during and after delivery.</p>
            <hr class="p-div">
            <p class="lead">With support from Johnson & Johnson, UNFPA is working to equip midwives with the skills they need to ensure safe birth.</p>
            <p class="final-credits">All Liberia photos © UNFPA/Elena Heatherwick</p>
          </div>
        </div>
      </div>
    </section>
    <popup-component v-bind:openedClass="sharing_video" v-on:close="sharing_video = false" class="popup-sharing">
      <div class="popup__content">
        <p class="title-h5">Midwives save lives, sometimes risking their own in the process. See how midwives in Liberia endeavoured to make <span>#SafeBirth</span> possible during the Ebola epidemic: <span>safebirthevenhere.org</span></p>
        <div class="buttons">
          <a class="btn btn--primary" v-on:click="shareFacebook('Midwives save lives, sometimes risking their own in the process. See how midwives in Liberia endeavoured to make #SafeBirth possible during the Ebola epidemic: safebirthevenhere.org', 'https://www.youtube.com/watch?v=P3OkdRDTwmc')">Share on Facebook</a>
          <br><br>
          <a class="btn btn--primary" v-on:click="shareTwitter('Midwives%20save%20lives%2C%20sometimes%20risking%20their%20own%20in%20the%20process.%20See%20how%20midwives%20in%20Liberia%20endeavoured%20to%20make%20%23safebirth%20possible%20during%20the%20Ebola%20epidemic%3A%20safebirthevenhere.org', 'https://www.youtube.com/watch?v=P3OkdRDTwmc', 'SafeBirth, UNFPA')">Share on Twitter</a>
        </div>
      </div>
    </popup-component>
  </stories-component>
</template>

<script>
import { TimelineMax, TweenMax, Linear, Power1, Power2 } from 'gsap'
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'

import StoriesComponent from './Stories.vue'
import VideoComponent from './Video.vue'
import NextGalleryComponent from './NextGallery.vue'
// import BgSwitchComponent from './BgSwitch.vue'
import ShareButtonComponent from './ShareButton'
import PopupComponent from './Popup.vue'

import sharing from './mixins/sharing.js'

export default {
  name: 'Haiti',
  mixins: [sharing],
  data () {
    return {
      // current: 1,
      sharing_video: false
    }
  },
  methods: {
    initParallax: function () {
      this.controller = new ScrollMagic.Controller()

      if (this.$root.isMobile || this.$root.testBrowser('chrome mobile') || this.$root.testBrowser('samsung') || this.$root.testBrowser('firefox mobile') || this.$root.testBrowser('safari mobile')) return

      this.buildTween(this.$refs.text1, this.$refs.text1, 0.3, {y: 150}, {y: -100, ease: Linear.easeInOut}, 'onEnter', 0, this.wh * 1.5)

      new ScrollMagic.Scene({triggerElement: this.$refs.hero1, triggerHook: 'onLeave', duration: this.wh * 0.5})
        .setPin(this.$refs.hero1)
        .addTo(this.controller)
      this.buildTween(this.$refs.hero1, this.$refs.text2, 0.5, {y: 10, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onLeave', 0, 0)

      // var line = this.$refs.clock.querySelector('.clock__line')
      // var icon = this.$refs.clock.querySelector('.clock__icon')
      // this.buildTween(this.$refs.hero1, line, 0.3, {scaleY: 0}, {scaleY: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.2, this.wh * 0.5)
      // this.buildTween(this.$refs.hero1, icon, 0.3, {opacity: 0}, {opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.6, 0)

      // this.buildTween(this.$refs.text3, this.$refs.text3, 0.7, {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
      this.buildTween(this.$refs.fixedText, this.$refs.fixedText_title1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}, 'onLeave', this.wh * 0.5, 0)
      this.buildTween(this.$refs.fixedText, this.$refs.fixedText_title2, 0.5, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, 'onLeave', this.wh * 0.5, 0)
      this.buildTween(this.$refs.fixedText, this.$refs.fixedText, 0.5, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', ease: Power2.easeOut}, 'onLeave', this.wh * 0.5, 0)
      new ScrollMagic.Scene({triggerElement: this.$refs.fixedText, triggerHook: 'onLeave', duration: this.wh * 0.8})
        .setPin(this.$refs.fixedText)
        .addTo(this.controller)

      this.buildTween(this.$refs.text4, this.$refs.text4, 0.7, {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      var imagesAnimations = this.$el.querySelectorAll('.image-animation')
      for (var i = 0; i < imagesAnimations.length; i++) {
        var overlay = imagesAnimations[i].querySelector('.image-animation__overlay')
        var image = imagesAnimations[i].querySelector('.image-animation__image')
        var text = imagesAnimations[i].querySelector('.image-animation__text')

        this.buildTween(imagesAnimations[i], overlay, 0.5, {scaleX: 0}, {scaleX: 1, ease: Power1.easeOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], overlay, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', delay: 0.6, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], image, 0.01, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

        if (text) {
          this.buildTween(imagesAnimations[i], text, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        }
      }
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
    },
    resizeScene: function () {
      this.wh = window.innerHeight
      if (this.controller) {
        this.controller.destroy(true)
        this.$nextTick(this.initParallax())
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resizeScene)
  },
  destroyed () {
    this.controller = this.controller.destroy(true)
    window.removeEventListener('resize', this.resizeScene)
  },
  mounted () {
    this.wh = window.innerHeight
    this.$nextTick(this.initParallax())
  },
  components: {
    StoriesComponent,
    VideoComponent,
    NextGalleryComponent,
    ShareButtonComponent,
    PopupComponent
    // BgSwitchComponent
  }
}
</script>

<style lang="scss" scoped>
.fixedText{
  position: relative;

  .container{
    position: relative;
    max-width: em(1280);
  }
  .row > div{
    position: relative;
  }
  p{
    margin: 0;
  }

  @media screen and (min-width: $mobile-breakpoint + 1) {
    .row{
      height: 100vh;
    }

    &__title2{
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      transform: translateY(-50%);
      color: #FFF;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    margin: em(40) 0;
    br{
      display: none;
    }
  }
}

.hero-liberia{
  background-image: url(../assets/images/liberia-img2.jpg);
}

.gallery-item1{background-image: url(../assets/images/Liberia_1.jpg); }
.gallery-item2{background-image: url(../assets/images/Liberia_2.jpg); }
.gallery-item3{background-image: url(../assets/images/Liberia_3.jpg); }
.gallery-item4{background-image: url(../assets/images/Liberia_4.jpg); }
.gallery-item5{background-image: url(../assets/images/Liberia_5.jpg); }
.gallery-item6{background-image: url(../assets/images/Liberia_6.jpg); }

.end-md{
  text-align: left;
}

.liberia-gallery{
  padding: 0;
}

.equipments{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;

  .bg-switch{
    z-index: 0;
    opacity: 0.6;
  }

  .row{
    position: relative;
    z-index: 1;
    height: 100vh;
    color: #FFF;

    p{
      font-family: $font_title;
      font-size: em(24);
      line-height: em(35, 24);
      letter-spacing: em(-0.2, 24);
    }
  }

  &__menu{
    text-align: center;

    li{
      display: inline-block;
      vertical-align: middle;
      margin: 0 em(25);

      a{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: em(18);
        width: em(150, 18);
        height: em(150, 18);
        padding: 0 em(10, 18);
        color: #FFF;
        border: 1px solid currentColor;
        border-radius: 50%;
        text-decoration: none;
        box-sizing: border-box;
        opacity: 0.5;
        transition: all 0.3s ease-in-out;

        &.active{
          opacity: 1;
          border-width: 3px;
        }
      }
    }
  }
}

.clock{
  position: absolute;
  left: 50%;
  transform: translate(-50%, -202px);
  color: $color1;
  z-index: 1;

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
    width: em(54);
    height: em(54);
    border-radius: 50%;
    color: currentColor;
    border: 1px solid currentColor;
    position: relative;
  }

  @media screen and (max-width: $mobile-breakpoint) {
    display: none;
  }
}
@media screen and (min-width: 1700px) {
  .image-animation{
    max-width: 120.625rem;
  }
}
@media screen and (min-width: 2000px) {
  .image-animation{
    max-width: 160.625rem;
  }
}
@media screen and (max-width: $mobile-breakpoint) {
  .hero-text {
    .image-credit{
      display: none;
    }
    .title-h4{
      text-align: left;
    }
  }
  .image-animation{
    > .row{
      flex-direction: column-reverse;
    }
    .image-credit{
      display: none;
    }
    .blockquote-default {
      padding-right: 0;
      padding-left: 1.1em;
      p{
        font-size: 30px !important;
        letter-spacing: -0.25px;
        line-height: 35px;
      }
    }
  }
  .blockquote-default{
    margin-bottom: 0;
    margin-top: em(20);
  }
  .gallery{
    margin-bottom: em(250);
  }
}
</style>
