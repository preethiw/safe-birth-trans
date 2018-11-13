<template>
  <main class="wrap" :class="{menuOpened: $root.menuOpened}">
    <div class="action">
      <bg-switch-component v-bind:current="bg" v-bind:backgrounds="['donate-bg.jpg', 'pledge-bg.jpg', 'share-bg.jpg']"></bg-switch-component>
      <div class="action__content">
        <!-- <p>safe birth even here can start with you</p> -->
        <ul v-if="$root.isMobile" class="action__menu">
          <li>
            <a :href="donateLink" target="_blank">Donate</a>
            <p> {{ $t("contribute_to_help_fund_the_lifesaving_work_of_midwives_and_provide_clean_delivery_kits_that_protect_women_during_childbirth") }} </p>
          </li>
          <li>
            <a href="https://secure2.convio.net/unfpa/site/SSurvey?ACTION_REQUIRED=URI_ACTION_USER_REQUESTS&SURVEY_ID=1543" target="_blank" v-if="isUS"> {{ $t("join") }} </a>
            <a v-on:click="pledge_popup = true; $root.menuOpened = true" v-else>{{ $t("join") }}</a>
            <p> {{ $t("stand_with_unfpa_to_end_maternal_deaths") }} </p>
          </li>
          <li>
            <a v-on:mouseover="bg = 3" v-on:click="showSharingPopup"> {{ $t("share") }} </a>
            <p> {{ $t("raise_awareness_of_every_pregnant_womans_right_to_a_safe_birth")}} </p>
          </li>
        </ul>
        <ul v-else class="action__menu" v-on:mouseleave="bg = 2">
          <li>
            <a href="https://secure2.convio.net/unfpa/site/SSurvey?ACTION_REQUIRED=URI_ACTION_USER_REQUESTS&SURVEY_ID=1543" target="_blank" v-on:mouseover="bg = 1" v-if="isUS">{{ $t("join") }}</a>
            <a v-on:click="pledge_popup = true; $root.menuOpened = true" v-on:mouseover="bg = 1" v-else>{{ $t("join") }}</a>
            <p>{{ $t("stand_with_unfpa_to_end_maternal_deaths") }} </p>
          </li>
          <li>
            <a :href="donateLink" target="_blank" v-on:mouseover="bg = 2">Donate</a>
            <p> {{ $t("contribute_to_help_fund_the_lifesaving_work_of_midwives_and_provide_clean_delivery_kits_that_protect_women_during_childbirth") }}</p>
          </li>
          <li>
            <a v-on:mouseover="bg = 3" v-on:click="showSharingPopup">{{ $t("share") }}</a>
            <p> {{ $t("raise_awareness_of_every_pregnant_womans_right_to_a_safe_birth")}} </p>
          </li>
        </ul>
      </div>
      <div class="action__footer">
        <!--<div class="action__logos">
          <div class="logo-jj">
            <span>Supported by</span>
            <img src="../assets/images/logo-jj.svg" alt="">
          </div>
        </div>-->
        <p> {{ $t("this_website_was_developed_with_support_from_johnson_johnson_safe_birth_even_here_is_a_unfpa_initiative_to_ensure_that_women_have_what_they_need_to_deliver_their_babies_safely_even_in_humanitarian_crises_and_fragile_situations") }} </p>
        <p><a href="http://www.unfpa.org/maternal-health" target="_blank" class="link-default"> {{ $t("learn_more_about_maternal_mortality") }}</a></p>
        <p class="show-on-mobile"> {{ $t("cover_photo_unfpa") }} <br/>{{ $t("south_sudanbruno_feder") }}</p>
        <p class="show-on-mobile">Safe birth even here ® 2018<br/><a class="link-default" href="#" target="_blank"> {{ $t("privacy_policy") }} </a> {{ $t("and") }} <a class="link-default" href="https://www.unfpa.org/terms-use" target="_blank"> {{ $t("terms_of_use") }} </a></p>
      </div>
      <div class="action__credits">
        <p>© {{ $t("lynsey_addario_for_time") }} </p>
      </div>
    </div>
    <popup-component v-bind:openedClass="pledge_popup" v-on:close="pledge_popup = false; $root.menuOpened = false" class="popup-action">
      <popup-pledge-component></popup-pledge-component>
    </popup-component>
    <popup-component v-bind:openedClass="sharing_popup" v-on:close="sharing_popup = false; $root.menuOpened = false" class="popup-sharing">
      <div class="popup__content">
        <flickity ref="flickity" :options="{freeScroll: false, wrapAround: true, cellAlign: 'center', pageDots: true, prevNextButtons: true}" class="carousel-share">
          <div class="popup-sharing__card">
            <p class="title-h5" v-html="$t('every_day_over_830_women_die_giving_birth_more_than_one_every_two_minutes_join_unfpa_to_support_safebirth_safebirthevenhereorg')"></p>
          </div>
          <div class="popup-sharing__card">
            <p class="title-h5" v-html="$t('i_stand_with_unfpa_to_end_maternal_deaths_each_of_us_can_make_a_difference_by_raising_awareness_about_a_pregnant_womans_right_to_a_safebirth_no_matter_where_she_lives_safebirthevenhereorg')"></p>
          </div>
          <div class="popup-sharing__card">
            <p class="title-h5" v-html="$t('every_two_minutes_a_woman_dies_giving_birth_you_can_support_safebirth_and_help_unfpa_stop_the_clock_find_out_how_here_safebirthevenhereorg')"> </p>
          </div>
        </flickity>
        <div class="buttons">
          <a class="btn btn--primary" v-on:click="shareCarousel(0)"> {{ $t("share_on_facebook") }} </a>
          <a class="btn btn--primary" v-on:click="shareCarousel(1)"> {{ $t("share_on_twitter") }} </a>
        </div>
      </div>
    </popup-component>
  </main>
</template>

<script>
import Flickity from 'vue-flickity'
import BgSwitchComponent from './BgSwitch.vue'
import PopupComponent from './Popup.vue'
import PopupPledgeComponent from './PopupPledge.vue'

// import { TimelineMax, TweenMax, Linear } from 'gsap'
import sharing from './mixins/sharing.js'
import slide from './mixins/slide.js'

export default {
  name: 'Action',
  mixins: [sharing, slide],
  data () {
    return {
      controller: null,
      bg: 2,
      dataUser: {name: '', number: 0},
      dataStory: {name: '', number: 0},
      sharing_popup: false,
      pledge_popup: false
    }
  },
  methods: {
    prevPage: function () {
      if (!this.$root.isMobile) {
        this.canScroll = false
        this.$router.push('/closing')
      }
    },
    // nextPage: function () {
    //   return false
    // },
    // animateSlide: function () {
    //   return 50
    // },
    move: function (direction) {
      if (direction === 'prev') {
        this.prevPage()
      }
    },
    animateSlide: function () {
      return false
    },
    showSharingPopup: function () {
      this.sharing_popup = true
      this.$root.menuOpened = true
      var that = this
      setTimeout(function () {
        that.$refs.flickity.$flickity.resize()
      }, 100)
    },
    shareCarousel: function (network) {
      var item = this.$refs.flickity.$flickity.selectedIndex

      if (network === 0) {
        if (item === 0) {
          this.shareFacebook('Every day, over 830 women die giving birth – more than one every two minutes. {{ $t("join") }} @UNFPA to support #SafeBirth: safebirthevenhere.org', 'safebirth')
        } else if (item === 1) {
          this.shareFacebook('I stand with @UNFPA to end maternal deaths. Each of us can make a difference by raising awareness about a pregnant woman’s right to a #SafeBirth, no matter where she lives: safebirthevenhere.org', 'safebirth')
        } else if (item === 2) {
          this.shareFacebook('Every two minutes, a woman dies giving birth. You can support #SafeBirth and help @UNFPA stop the clock. Find out how here: safebirthevenhere.org', 'safebirth')
        }
      } else if (network === 1) {
        if (item === 0) {
          this.shareTwitter('Every%20day%2C%20over%20830%20women%20die%20giving%20birth%20%E2%80%93%20more%20than%20one%20every%20two%20minutes.%20Join%20%40UNFPA%20to%20support%20%23SafeBirth%3A%20', 'safebirth', '')
        } else if (item === 1) {
          this.shareTwitter('I%20stand%20with%20%40UNFPA%20to%20end%20maternal%20deaths.%20Each%20of%20us%20can%20make%20a%20difference%20by%20raising%20awareness%20about%20a%20pregnant%20woman%E2%80%99s%20right%20to%20a%20%23SafeBirth%2C%20no%20matter%20where%20she%20lives%3A%20', 'safebirth', '')
        } else if (item === 2) {
          this.shareTwitter('Every%20two%20minutes%2C%20a%20woman%20dies%20giving%20birth.%20You%20can%20support%20%23SafeBirth%20and%20help%20%40UNFPA%20stop%20the%20clock.%20Find%20out%20how%20here%3A%20', 'safebirth', '')
        }
      }
    }
  },
  computed: {
    isUS: function () {
      if (this.$root.userLocation && this.$root.userLocation.countryCode === 'US') {
        return true
      } else {
        return false
      }
    },
    donateLink: function () {
      if (this.$root.userLocation && this.$root.userLocation.countryCode === 'US') {
        return 'https://secure2.convio.net/unfpa/site/Donation2?1721.donation=form1&df_id=1721&mfc_pref=T'
      } else {
        return 'https://www.unfpa.org/donate'
      }
    }
  },
  components: {
    Flickity,
    BgSwitchComponent,
    PopupPledgeComponent,
    PopupComponent
  }
}
</script>

<style lang="scss" scoped>

.action{
  height: 100vh;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: em(100);
  box-sizing: border-box;
  text-align: center;
  background-color: #0C1020;
  .show-on-mobile{
    display: none;
  }
  .bg-switch{
    opacity: 0.5;
    pointer-events: none;
  }

  &__content{
    position: relative;
    z-index: 1;
  }

  &__menu{
    margin: 0 0;
    padding: 0;

    li{
      display: inline-block;
      margin: 0 em(60);
      position: relative;

      a{
        cursor: pointer;
        font-family: $font_title;
        font-size: em(100);
        line-height: 1em;
        color: currentColor;
        text-decoration: none;
        opacity: 0.5;
        display: inline-block;
        transition: opacity 0.3s ease-in-out;

        &:hover{
          opacity: 1;
        }
      }

      p{
        font-size: em(18);
        line-height: em(25, 18);
        position: absolute;
        width: 100%;
        bottom: em(-40, 18);
        left: 0;
        text-align: center;
        transform: translateY(100%);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      &:hover{
        p{
          opacity: 1;
        }
      }
    }
  }

  &__logos{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: em(35) 0;

    .logo-unfpa{
      img{
        width: auto;
        height: em(44);
      }
    }

    .logo-jj{
      /*margin-left: em(40);*/

      span{
        display: block;
        font-size: em(10);
        margin-bottom: 1em;
      }

      img{
        width: auto;
        height: em(25);
      }
    }
  }

  &__footer{
    position: absolute;
    z-index: 1;
    width: 100%;
    left: 0;
    bottom: em(40);

    > p{
      font-size: em(12);
      max-width: em(600, 12);
      margin: 0 auto;
      text-align: center;

      &:not(:last-child){
        margin-bottom: em(25, 12);
      }
    }

    a{
      color: currentColor;
      text-decoration: none;
    }
  }

  &__credits{
    position: absolute;
    bottom: em(40);
    right: em(50);

    p{
      text-align: right;
      font-size: em(10);
      margin: 0;
      color: #FFF;
    }
  }
  @media screen and (max-width: 1300px) {
    &__menu li{
      a{
        font-size: 4.25em;
      }
      p{
        font-size: 0.72em;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    &__menu li{
      margin: 0 1.75em;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    width: 100%;
    display: table;
    height: auto;
    padding-bottom: em(30);
    background: url(../assets/images/TakeAction2.jpg) no-repeat center;
    -webkit-background-size: cover;
    background-size: cover;
    .show-on-mobile{
      display: block;
    }
    p{
      text-align: center;
    }
    .bg-switch{
      display: none;
    }

    &__footer{
      position: static;
      padding: 0 em(20);
      box-sizing: border-box;

      > p{
        box-sizing: border-box;
        font-size: em(13);
        line-height: em(20, 13);
        //border-top: 1px solid rgba(151, 151, 151, 0.4);
        padding: em(35, 13) em(20, 13) 0;
        color: #FFF;
      }
      .link-default::after{
        transform: scale(1, 1) translateY(3px);
      }
      .credits{
        font-size: em(9);
      }
    }

    &__menu{
      text-align: center;
      margin-top: em(110);
      display: flex;
      flex-direction: column;

      li{
        margin: 0;
        margin-bottom: em(60);
        display: flex;
        flex-direction: column-reverse;
        align-items: center;

        a{
          width: 80%;
          max-width: 290px;
          background: white;
          color: #0C1020;
          font-size: em(18);
          opacity: 1;
          padding: 16px;
          box-sizing: border-box;
          border-radius: 26px;
        }
        p{
          position: static;
          opacity: 1;
          font-size: 0.9em;
          letter-spacing: 0;
          max-width: 80%;
          margin: 0 auto;
          margin-bottom: 12px;
          transform: none;
        }
        /*&:nth-child(1){
          order: 2;
        }
        &:nth-child(2){
          order: 1;
        }
        &:nth-child(3){
          order: 3;
        }*/
      }
    }
    .action__credits{
      display: none;
    }
  }
}
</style>
