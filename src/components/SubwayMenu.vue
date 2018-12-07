<template>
  <nav class="subway-menu" :class="{light: $route.name == 'Home', opened: opened}">
    <transition-group name="fade">
      <close-button-component v-if="$root.isMobile" v-show="opened" v-on:toggle="opened = false" key="close"></close-button-component>
      <toggle-button-component v-if="$root.isMobile" v-show="!opened" v-on:toggle="opened = !opened" key="toggle"></toggle-button-component>
    </transition-group>
    <ul>
      <li :class="{active: $route.path == item || ($route.path == '/action' && item == '/closing')}" :key="item" v-for="item in $root.menuOrder"><router-link :to="languageClass + item"><span>{{menuName(item)}}</span></router-link></li>
    </ul>

    <div class="subway-menu__buttons" v-if="$root.isMobile">
      <a href="#" v-on:click="share">Share</a>
      <a :href="donateLink" target="_blank">Donate</a>
    </div>
  </nav>
</template>

<script>
import ToggleButtonComponent from './ToggleButton.vue'
import CloseButtonComponent from './CloseButton.vue'

export default {
  name: 'SubwayMenu',
  props: {
    donateLink: String
  },
  computed: {
    languageClass:function(){
      return  '/' + this.$route.params.locale
    }
  },
  methods: {
    toggle: function () {
      this.$emit('toggle')
    },
    share: function () {
      this.$emit('share')
    },
    menuName: function (item) {
      var name = item.slice(1)

      switch (name) {
        case '':
          return 'Home'
        case 'closing':
          return 'Take Action'
        default:
          return name
      }
    }
  },
  watch: {
    '$route': function () {
      this.opened = false
    }
  },
  data () {
    return {
      opened: false
    }
  },
  components: {
    ToggleButtonComponent,
    CloseButtonComponent
  }
}
</script>

<style lang="scss" scoped>
.subway-menu{
  position: fixed;
  right: em(50);
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  color: #BCBCBC;

  &.light{
    color: #FFF;
  }

  ul{
    padding: 0;
    margin: 0;

    li{
      display: block;
      text-align: right;
      position: relative;

      &:before{
        content: "";
        position: absolute;
        top: 50%;
        right: em(15);
        display: inline-block;
        vertical-align: middle;
        width: em(10);
        height: em(10);
        margin-top: em(-5);
        border-radius: 50%;
        background-color: currentColor;
        z-index: -1;
        opacity: 0.3;
      }

      @media screen and (min-width: $mobile-breakpoint + 1) {
        &:after{
          content: "";
          display: block;
          width: em(40);
          height: em(40);
          position: absolute;
          right: 0;
          top: 0;
          border-radius: 50%;
          border: 1px solid currentColor;
          box-sizing: border-box;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
      }

      a{
        font-family: $font_title;
        text-transform: uppercase;
        font-size: em(14);
        letter-spacing: em(1.17, 14);
        display: block;
        color: currentColor;
        text-decoration: none;
        height: em(40, 14);
        line-height: em(40, 14);
        padding-right: em(40, 14);
        width: 0;
        transition: width 0.01s ease 0.3s;

        span{
          opacity: 0;
          transform: translateX(5px);
          display: inline-block;
          z-index: -1;
          transition: z-index 0.01s ease-in-out, opacity 0.3s ease-in-out 0.01s, transform 0.3s ease-in-out 0.01s;
          padding-right: em(20);
        }
      }

      @media screen and (min-width: $mobile-breakpoint + 1) {
        &:not(:last-child){
          margin-bottom: em(20);
        }
      }

      &:hover{
        &:after{
          /*opacity: 1;*/
        }
      }
    }

    @media screen and (min-width: $mobile-breakpoint + 1) {
      &:hover{
        li{
          a{
            width: em(140);
            transition: width 0.01s ease 0s;

            span{
              z-index: 0;
              opacity: 0.5;
              transform: translateX(0);
            }
          }

          &.active{
            a{
              span{
                opacity: 1;
              }
            }
            &:after{
              opacity: 1;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    //display: none;
    right: 0;
    top: 0;
    transform: none;
    height: 100%;
    /*color: #FFF;*/
    /*overflow: hidden;*/

    &:before{
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: em(260);
      transform: translate(260px);
      height: 100%;
      background-color: $color_body;
      z-index: -1;
      transition: transform 0.3s ease-in-out 0.1s;
    }

    .toggle-btn{
      position: absolute;
      top: em(35);
      right: em(25);
      /*height: 60px;
      width: 60px;
      top: 5px;
      right: -12px;
      & >>> button{
        height: 100%;
      }*/
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .close-btn{
      padding: em(25);
    }

    ul{
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      pointer-events: none;
      opacity: 0;
      li{
        &:before{
          right: em(12);
          width: em(6);
          height: em(6);
        }
        a{
          padding-right: em(35);

          span{
            padding-right: em(10, 14);
            font-size: em(18, 14);
          }
        }
      }
    }

    &.opened{
      &:before{
        transform: translate(0px);
        transition-delay: 0;
      }

      ul{
        pointer-events: unset;
        opacity: 1;
        li{
          a{
            transition: width 0.01s ease 0s;
            width: em(200, 14);

            span{
              opacity: 0.5;
              transform: translateX(0);
              transition-delay: 0.2s;
            }
          }
          &.active{
            &:before, span{
              opacity: 1;
            }
          }
        }
      }

      .subway-menu__buttons{
        opacity: 1;
        transform: translateX(0);
        transition: opacity 0.2s ease-in-out 0.3s, transform 0.01s ease 0.01s;
      }
    }

    &__buttons{
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      width: em(260);
      opacity: 0;
      transform: translateX(100%);
      transition: opacity 0.3s ease-in-out 0s, transform 0.01s ease 0.3s;

      a{
        display: block;
        width: 50%;
        font-size: em(14);
        height: em(90, 14);
        line-height: em(90, 14);
        text-align: center;
        background-color: #E5E5E5;
        text-decoration: none;
        color: $color_body;
        text-transform: uppercase;
      }
    }
  }
}
</style>
