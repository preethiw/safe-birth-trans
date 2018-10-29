<template>
  <div class="toggle-btn" v-on:click="toggle">
    <button class="toggle-btn__button" v-bind:class="{ opened: openedClass }">
      <span>Toggle Menu</span>
    </button>
    <label for="" class="toggle-btn__label">menu</label>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    openedClass: Boolean
  },
  methods: {
    toggle: function () {
      this.$emit('toggle')
    }
  },
  data () {
    return {
      limit: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-btn{
  cursor: pointer;

  &__label{
    display: none;
    font-size: em(18);
    line-height: 0.5em;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    margin-left: em(5);
    /*margin-top: em(2);*/

    @media screen and (max-width: $mobile-breakpoint) {
      display: none;
    }
  }

  &:hover{
    .toggle-btn__button{
      span{
        &:after, &:before{
          width: 100%;
        }
      }
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    height: em(11);
  }
}

.toggle-btn__button{
  font-size: 1em;
  border: none;
  padding: em(5) 0;
  margin: 0;
  width: em(18);
  color: currentColor;
  background: none;
  cursor: pointer;
  outline: none;
  transition: color 0.3s ease-in-out;
  box-sizing: content-box;

  span{
    display: block;
    background-color: currentColor;
    text-indent: -9999px;
    width: 100%;
    height: 1px;
    position: relative;
    -webkit-touch-callout: none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
     transition: transform 0.4s, background 0.3s ease-in-out 0s;

    &:before, &:after{
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: currentColor;
      position: absolute;
      right: 0;
      top: 0;
      transition: width 0.3s ease-in-out;
    }

    &:before{
      transform: translateY(-500%);
      /*animation: nav_up_reverse 0.3s linear forwards;*/
    }
    &:after{
      transform: translateY(500%);
      width: 100%;
      /*animation: nav_down_reverse 0.3s linear forwards;*/
    }

  }

  /*&:hover{
    span{
      &:after, &:before{
        width: 100%;
      }
    }
  }*/

  &.opened{
    span{
      background-color: transparent !important;
      transition: background-color 0.1s linear 0s;

      &:before{
        width: 100%;
        animation: nav_up 0.3s linear forwards;
      }
      &:after{
        width: 100%;
        animation: nav_down 0.3s linear forwards;
      }
    }
  }
  @media screen and (max-width: $mobile-breakpoint) {
    //height: 100%;
  }
}

@keyframes nav_up {
  0% {
   transform: translateY(-500%) rotate(0);
  }
  10% {
    transform: translateY(0) rotate(0);
  }
  100%{
    transform: translateY(0) rotate(45deg);
  }
}

@keyframes nav_down {
  0% {
   transform: translateY(500%) rotate(0);
  }
  10% {
    transform: translateY(0) rotate(0);
  }
  100%{
    transform: translateY(0) rotate(-45deg);
  }
}

@keyframes nav_up_reverse {
  0% {
    transform: translateY(0) rotate(45deg);
  }
  10% {
    transform: translateY(0) rotate(0);
  }
  100%{
    transform: translateY(-500%) rotate(0);
  }
}

@keyframes nav_down_reverse {
  0% {
    transform: translateY(0) rotate(-45deg);
  }
  10% {
    transform: translateY(0) rotate(0);
  }
  100%{
   transform: translateY(500%) rotate(0);
  }
}
</style>
