<template>
  <stories-component v-bind:title="'Haiti'">
    <section class="intro" ref="intro">
      <div class="container">
        <div class="row center-md middle-xs">
          <div class="col-xs-12 col-xl-12 col-sm-6 col-md-7 col-lg-8">
            <h3 class="title-h3 little-xs" ref="text1">{{ $t("after_the_earthquake") }}</h3>
            <br class="show-mobile"/>
            <h3 class="title-h3 intro__sub little-xs" ref="text1_sub">{{ $t("she_and_her_baby_died") }}</h3>
          </div>
        </div>
      </div>
    </section>
    <section class="hero-text nested-on-mobile" ref="hero1">
      <figure class="haiti-hero1"></figure>
      <div class="container">
        <div class="row center-md middle-md">
          <div class="col-md-9 col-xs-12">
            <p class="title-h4" ref="text4">{{ $t("when_her_own_time_came_iloyese_had_to_travel_4_hours_to_get_to_a_clinic_to_give_birth") }}</p>
          </div>
        </div>
      </div>
      <figcaption class="image-credit">
        © {{ $t("unfpa_elena_heatherwick") }}
      </figcaption>
    </section>
    <section class="margin-default image-animation" ref="gallery1">
      <div class="row middle-md">
        <div class="col-md-7 col-xs-12">
          <figure>
            <div class="image-animation__overlay image-animation__overlay--right"></div>
            <div class="haiti-gallery image-animation__image">
              <next-gallery-component ref="nextGallery">
                <div class="carousel-images__item">
                  <figure class="gallery-item1"></figure>
                  <p>{{ $t("midwife_stephanie_roche_hands_gloved_to_protect_her_patient_from_infection_prepares_to_attend_to_a_delivery_at_marigot_maternal_health_centre_clinic_in_marigot_haiti") }} <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item2"></figure>
                  <p>{{ $t("iloyese_rests_at_the_clinic_with_her_newborn_when_she_finally_got_to_the_clinic_i_met_ms_roche_and_liked_her_a_lot_because_of_the_way_she_serves_and_interacts_with_the_women") }} <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item3"></figure>
                  <p>{{ $t("the_clinic_in_marigot_also_serves_women_who_like_iloyese_have_to_travel_from_afar_to_get_the_care_they_need_the_problem_of_access_says_midwife_roche_it_is_a_huge_challenge_even_now") }} <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item4"></figure>
                  <p>{{ $t("in_addition_to_providing_services_maternal_health_clinics_can_offer_information_and_counselling_that_help_women_and_girls_make_informed_decisions_and_stay_healthy_and_safe") }} <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item5"></figure>
                  <p>{{ $t("beyond_delivering_babies_maternal_health_clinics_also_provide_a_range_of_services_from_antenatal_care_to_family_planning_to_hiv_testing_that_are_critical_for_sexual_and_reproductive_health") }} <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item6"></figure>
                  <p>For midwife Roche, the best part of her job happens in the delivery room. “The woman has been waiting for her baby,” she says, “so have we. So for me, that is the best moment.” <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
                <div class="carousel-images__item">
                  <figure class="gallery-item7"></figure>
                  <p>UNFPA, with support from Johnson & Johnson, is working to strengthen midwifery in Haiti. And thanks to the work of midwives like Ms. Roche, maternal deaths are falling by 2.2 per cent each year. “Midwives give life,” she says. <span>© {{ $t("unfpa_elena_heatherwick") }}</span></p>
                </div>
              </next-gallery-component>
            </div>
          </figure>
        </div>
        <div class="col-md-3 col-md-offset-1 col-xs-12">
          <div class="image-animation__text">
            <p class="title-h4 little-xs" ref="text2">She made it, and delivered her baby with the help of midwife Stephanie Roche.</p>
          </div>
        </div>
      </div>
     <!--  <figure>
        <div class="image-floating__overlay image-animation__overlay image-animation__overlay--right"></div>
        <div class="haiti-gallery image-animation__image">
          <next-gallery-component ref="nextGallery">
            <div class="carousel-images__item gallery-item1"></div>
            <div class="carousel-images__item gallery-item2"></div>
            <div class="carousel-images__item gallery-item3"></div>
            <div class="carousel-images__item gallery-item4"></div>
            <div class="carousel-images__item gallery-item5"></div>
          </next-gallery-component>
        </div>
      </figure>
      <div class="image-floating__text image-animation__text">
        <p class="title-h4" ref="text2">She made it, and delivered her baby with the help of midwife Stefani Roche.</p>
      </div> -->
    </section>
    <section class="video margin-small">
      <div class="container">
        <div class="row">
          <div class="col-md-12" ref="video1">
            <div class="video__share">
              <share-button-component v-on:click="sharing_video = true" class="light"></share-button-component>
            </div>
            <video-component v-bind:src="require('../assets/videos/haiti_full.mp4')" v-bind:cover="require('../assets/images/cover-video1.jpg')" v-bind:fullmode="false" v-bind:title="'The challenge of access'"></video-component>
          </div>
        </div>
      </div>
    </section>
    <section class="share margin-small row center-xs">
      <share-button-component v-on:click="sharing_video = true" class="vertical"></share-button-component>
    </section>
    <section class="margin-small">
      <div class="container">
        <div class="row center-md middle-xs">
          <div class="col-md-7 col-xs-12" ref="text3">
            <p class="lead">Most maternal deaths can be prevented with skilled care before, during and after delivery.</p>
            <hr class="p-div">
            <p class="lead">With support from Johnson & Johnson, UNFPA is working to equip midwives with the skills they need to ensure safe birth.</p>
            <p class="final-credits">All Haiti photos © {{ $t("unfpa_elena_heatherwick") }}</p>
          </div>
        </div>
      </div>
    </section>
    <popup-component v-bind:openedClass="sharing_video" v-on:close="sharing_video = false" class="popup-sharing">
      <div class="popup__content">
        <p class="title-h5">What if you were in labour, but the nearest clinic was 4 hours away? One woman in Haiti recounts her journey to secure a <span>#SafeBirth</span> for herself and her baby: <span>safebirthevenhere.org</span></p>
        <div class="buttons">
          <a class="btn btn--primary" v-on:click="shareFacebook('What if you were in labour, but the nearest clinic was 4 hours away? One woman in Haiti recounts her journey to secure a #SafeBirth for herself and her baby: safebirthevenhere.org', 'https://www.youtube.com/watch?v=kalOOR680xU')">Share on Facebook</a>
          <br><br>
          <a class="btn btn--primary" v-on:click="shareTwitter('What%20if%20you%20were%20in%20labour%2C%20but%20the%20nearest%20clinic%20was%204%20hours%20away%3F%20One%20woman%20in%20Haiti%20recounts%20her%20journey%20to%20secure%20a%20%23safebirth%20for%20herself%20and%20her%20baby%3A%20safebirthevenhere.org', 'https://www.youtube.com/watch?v=kalOOR680xU', 'SafeBirth, UNFPA')">Share on Twitter</a>
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
// import HorizontalPinnedComponent from './HorizontalPinned.vue'
import VideoComponent from './Video.vue'
import NextGalleryComponent from './NextGallery.vue'
import ShareButtonComponent from './ShareButton'
import PopupComponent from './Popup.vue'

import sharing from './mixins/sharing.js'

export default {
  name: 'Haiti',
  mixins: [sharing],
  data () {
    return {
      controller: null,
      wh: 0,
      sharing_video: false
    }
  },
  methods: {
    initParallax: function () {
      this.controller = new ScrollMagic.Controller()

      if (this.$root.isMobile) return

      this.buildTween(this.$refs.intro, this.$refs.text1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}, 'onLeave', this.wh * 0.5, 0)
      this.buildTween(this.$refs.intro, this.$refs.text1_sub, 0.5, {opacity: 0}, {opacity: 1, ease: Power2.easeOut}, 'onLeave', this.wh * 0.5, 0)
      this.buildTween(this.$refs.intro, this.$refs.intro, 0.5, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', ease: Power2.easeOut}, 'onLeave', this.wh * 0.5, 0)
      new ScrollMagic.Scene({triggerElement: this.$refs.intro, triggerHook: 'onLeave', duration: this.wh * 0.8})
        .setPin(this.$refs.intro)
        .addTo(this.controller)

      new ScrollMagic.Scene({triggerElement: this.$refs.hero1, triggerHook: 'onLeave', duration: this.wh * 0.3})
        .setPin(this.$refs.hero1)
        .addTo(this.controller)
      this.buildTween(this.$refs.hero1, this.$refs.text4, 0.5, {y: 10, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onLeave', 0, 0)

      this.buildTween(this.$refs.text2, this.$refs.text2, 0.3, {y: 100}, {y: -300, ease: Linear.easeInOut}, 'onEnter', 0, this.wh * 1.5)
      // this.buildTween(this.$refs.video1, this.$refs.video1, 0.7, {opacity: 0}, {opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      this.buildTween(this.$refs.text3, this.$refs.text3, 0.7, {y: 50, opacity: 0}, {y: 0, opacity: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)

      var imagesAnimations = this.$el.querySelectorAll('.image-animation')
      for (var i = 0; i < imagesAnimations.length; i++) {
        var overlay = imagesAnimations[i].querySelector('.image-animation__overlay')
        var image = imagesAnimations[i].querySelector('.image-animation__image')
        var text = imagesAnimations[i].querySelector('.image-animation__text')

        this.buildTween(imagesAnimations[i], overlay, 0.5, {scaleX: 0}, {scaleX: 1, ease: Power1.easeOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], overlay, 0.5, {opacity: 1, display: 'block'}, {opacity: 0, display: 'none', delay: 0.6, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], image, 0.01, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
        this.buildTween(imagesAnimations[i], text, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut}, 'onEnter', this.wh * 0.3, 0)
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
      // if (this.controller) {
      //   this.controller.destroy(true)
      //   this.$nextTick(this.initParallax())
      // }
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

    // var that = this
    // this.$refs.nextGallery.$children[0].on('select', function () {
    //   TweenMax.to(that.$refs.text2, 0.5, {opacity: 0, ease: Linear.easeInOut})
    // })
  },
  components: {
    StoriesComponent,
    // HorizontalPinnedComponent,
    VideoComponent,
    NextGalleryComponent,
    ShareButtonComponent,
    PopupComponent
  }
}
</script>

<style lang="scss" scoped>
.intro{
  position: relative;
  .container{
    max-width: em(1280);
  }
  .row > div{
    position: relative;
  }

  @media screen and (min-width: $mobile-breakpoint + 1) {
    .row{
      height: 100vh;
    }

    &__sub{
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
    margin: em(60) 0;
  }
}

.haiti-hero1{
  background-image: url(../assets/images/haiti-img2.jpg);
}

.gallery-item1{background-image: url(../assets/images/Haiti_1.jpg); }
.gallery-item2{background-image: url(../assets/images/Haiti_2.jpg); }
.gallery-item3{background-image: url(../assets/images/Haiti_3.jpg); }
.gallery-item4{background-image: url(../assets/images/Haiti_4.jpg); }
.gallery-item5{background-image: url(../assets/images/Haiti_5.jpg); }
.gallery-item6{background-image: url(../assets/images/Haiti_6.jpg); }
.gallery-item7{background-image: url(../assets/images/Haiti_7.jpg); }
</style>
