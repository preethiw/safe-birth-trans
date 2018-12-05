<template>
  <div>
    <transition-group name="nav-transition" appear>
      <header class="main-nav" ref="nav" :class="{menuOpened: $root.menuOpened, light: lightClass}" key="'header'">
        <div class="main-nav__logo">
          <router-link to="/">
            <img src="../assets/images/logo-unfpa.svg" alt="" v-if="$route.name != 'Home'">
            <img src="../assets/images/logo-unfpa-light.svg" alt="" v-if="$route.name == 'Home'">
            <img src="../assets/images/favicon.png" style="display: none"/>
            <h1 id="safeBirthText">safe birth even here</h1>
          </router-link>
        </div>
        <div class="main-nav__counter" v-if="$route.name != 'Closing' && $route.name != 'Action' && $route.name != 'Home'">
          <counter-component></counter-component>
        </div>
        <div class="lan-btn-wrapper"><navbar-component /></div>
        <div class="main-nav__menu" v-if="$route.name != 'Closing' && $route.name != 'Action' && !$root.isMobile">
          <ul>
            <li><a :href="donateLink" target="_blank" class="btn-donate">Donate</a></li>
            <li>
              <a href="#" v-on:click="openShare">
                <span>Share</span>
                <svg viewBox="0 0 22 24">
                  <g id="a_icon_share" transform="translate(1.000000, 1.000000)" stroke="currentColor" fill="none">
                    <circle id="Oval-6" cx="3.46153846" cy="11.9230769" r="3.46153846"></circle>
                    <circle id="Oval-6-Copy" cx="16.5384615" cy="3.46153846" r="3.46153846"></circle>
                    <circle id="Oval-6-Copy-2" cx="16.5384615" cy="18.8461538" r="3.46153846"></circle>
                    <path d="M6.53846154,9.61538462 L13.4615385,5.76923077" id="Line-3" stroke-linecap="square"></path>
                    <path d="M6.53846154,17.3076923 L13.4615385,13.4615385" id="Line-3" stroke-linecap="square" transform="translate(10.000000, 15.384615) scale(-1, 1) translate(-10.000000, -15.384615) "></path>
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="main-nav__toggle">
          <toggle-button-component v-on:toggle="toggleMenu"></toggle-button-component>
        </div> -->
      </header>
      <subway-menu-component key="menu" v-bind:donateLink="donateLink" v-on:share="sharing_popup = true"></subway-menu-component>
    </transition-group>
    <popup-component v-bind:openedClass="sharing_popup" v-on:close="sharing_popup = false" class="popup-sharing">
        <div class="popup__content">
          <p class="title-h5">Every day, over 830 women die giving birth – more than one every two minutes. Most could have been saved. Join <span>@UNFPA</span> to support <span>#SafeBirth</span>: <span>safebirthevenhere.org</span></p>
          <div class="buttons">
            <a class="btn btn--primary" v-on:click="shareFacebook('Every day, over 830 women die giving birth – more than one every two minutes. Most could have been saved. Join @UNFPA to support #SafeBirth: safebirthevenhere.org', 'safebirth')">Share on Facebook</a>
            <br><br>
            <a class="btn btn--primary" v-on:click="shareTwitter('Every%20day%2C%20over%20830%20women%20die%20giving%20birth%20%E2%80%93%20more%20than%20one%20every%20two%20minutes.%20Most%20could%20have%20been%20saved.%20Join%20%40UNFPA%20to%20support%20%23SafeBirth%3A', 'safebirth', '')">Share on Twitter</a>
          </div>
        </div>
      </popup-component>
  </div>
</template>

<script>
import SubwayMenuComponent from './SubwayMenu'
import CounterComponent from './Counter'
import PopupComponent from './Popup.vue'
import NavbarComponent from './Navbar.vue'
import sharing from './mixins/sharing.js'

export default {
  name: 'Navigation',
  mixins: [sharing],
  data () {
    return {
      lastScroll: 0,
      sticky: true,
      top: 0,
      sharing_popup: false
    }
  },
  methods: {
    toggleMenu: function () {
      this.$root.menuOpened = !this.$root.menuOpened
      // this.$root.menuOpened = true
    },
    checkScroll: function () {
      this.top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
    },
    openShare: function (e) {
      e.preventDefault()
      this.sharing_popup = true
    }
  },
  computed: {
    isIntro: function () {
      return this.$route.name === 'Home' && this.$root.isIntro
    },
    lightClass: function () {
      if ((this.$route.name === 'Home' || this.$route.name === 'Liberia' || this.$route.name === 'Kenya' || this.$route.name === 'Haiti') &&
          this.top < window.innerHeight) {
        return true
      } else {
        return false
      }
    },
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
  created () {
    document.addEventListener('scroll', this.checkScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.checkScroll)
  },
  components: {
    SubwayMenuComponent,
    CounterComponent,
    PopupComponent,
    NavbarComponent
  }
}
</script>

<style lang="scss" scoped>
.main-nav{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  color: #BCBCBC;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: em(100);
  padding: em(35) em(50);
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  pointer-events: none;
  > *{
    pointer-events: all;
  }
  &.light{
    color: #FFF;

    .main-nav__menu ul li a.btn-donate{
      border: none;
    }
  }
  &__logo{
    font-size: em(14);
    line-height: 1em;
    color: currentColor;
    transition: opacity 0.3s ease-in-out;

    img, svg{
      width: auto;
      height: em(35) !important;
    }

    a{
      color: currentColor;
      text-decoration: none;
      display: flex;
      align-items: center;

      h1{
        white-space: nowrap;
        transition: opacity 0.3s ease-in-out;

        &:before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          height: em(25, 14);
          border-left: 1px solid currentColor;
          margin: 0 em(15, 14);
        }
      }
    }

    &.hide{
      opacity: 0;
      pointer-events: none;
    }
  }

  @media screen and (min-width: $mobile-breakpoint + 1) {
    &__counter{
      position: absolute;
      left: 50%;
      top: em(25);
      transform: translate(-50%, 0%);
    }
  }

  &__menu{
    ul{
      padding: 0;
      margin: 0;

      li{
        display: inline-block;
        margin-left: em(35);

        a{
          font-size: em(14);
          height: em(40, 14);
          line-height: em(40, 14);
          font-weight: 600;
          display: block;
          text-transform: uppercase;
          color: currentColor;
          text-decoration: none;
          box-sizing: border-box;

          &.btn-donate{
            padding: 0 em(35, 14);
            border-radius: em(25, 14);
            background-color: #fff;
            color: #131836;
            border: 1px solid #B9B9B9;
          }

          span{
            display: none;
          }

          svg{
            display: inline-block;
            vertical-align: middle;
            width: em(22, 14);
            height: em(24, 14);
            margin-left: em(10, 14);
          }
        }
      }
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    padding: em(25) em(25) 0 em(25);
    height: em(60);

    &__logo{
      img, svg{
        height: em(35) !important;
      }

      h1{
        //display: none;
        font-size: 10px;
        opacity: 0;
        &.show{
          opacity: 1;
        }
      }
    }
    &__menu{
      display: none;
    }

    &__counter{
      top: em(15);
      left: 30%;
      transform: translateX(-50px);
      margin-right: em(40);
    }
  }
}

.nav-transition-enter-active, .nav-transition-leave-active {
  transition: opacity .5s;
}
.nav-transition-enter, .nav-transition-leave-to{
  opacity: 0;
}

.nav-transition-enter-active{
  transition-delay: 1s;
}
</style>
