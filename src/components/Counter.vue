<template>
  <div class="counter" v-on:click="$root.counterPopup = true">
    <div class="counter__time">{{womenCount}}</div>
    <svg class="color" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" :stroke-dashoffset="stroke">
      <defs>
        <linearGradient :id="id" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stop-color="#F33C3C" offset="0%"></stop>
          <stop stop-color="#FFDC26" offset="50%"></stop>
          <stop stop-color="#2EFFAE" offset="100%"></stop>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" :stroke="'url(#' + id + ')'" stroke-width="4" fill="none"/>
    </svg>
    <svg class="border"  width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" fill="none" r="47" stroke-width="2"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  computed: {
    time: function () {
      var hours = Math.floor(this.$root.counter / 3600)
      var minutes = Math.floor((this.$root.counter - (hours * 3600)) / 60)
      var seconds = this.$root.counter - (hours * 3600) - (minutes * 60)
      var time = ''

      minutes = (minutes < 10) ? '0' + minutes : String(minutes)

      time += minutes + ':'
      time += (seconds < 10) ? '0' + seconds : String(seconds)

      return time
    },
    womenCount: function () {
      if (this.$root.women > 0 && this.$root.women < 10) {
        return '0' + this.$root.women
      } else {
        return this.$root.women
      }
    },
    stroke: function () {
      var stroke = (this.$root.counter * 300) / 120
      return 304 - stroke
    },
    id: function () {
      return 'gradient' + (Math.floor(Math.random() * (100 - 2)) + 2)
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
.counter{
  cursor: pointer;
  font-size: em(16);
  width: em(45, 16);
  height: em(45, 16);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: currentColor;
  //border: 1px solid currentColor;
  position: relative;
  transition: transform 0.8s ease-in-out;
  &:before{
    content: "";
    display: block;
    width: 1px;
    height: em(3, 16);
    background-color: currentColor;
    position: absolute;
    top: em(2, 16);
    left: 50%;
    transform: translate(-50%, -100%);
  }

  &:after{
    content: "";
    display: block;
    width: em(12, 16);
    height: em(4, 16);
    border: 1px solid currentColor;
    position: absolute;
    top: em(-1);
    left: 50%;
    transform: translate(-50%, -100%);
    box-sizing: border-box;
    border-radius: em(3, 16);
  }

  svg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    stroke-dasharray: 300;
    /*stroke-dashoffset: 0;*/
    vector-effect: non-scaling-stroke;
    stroke-width: 2px;
    transform: rotate(-90deg);
    transition: all 1s linear;
  }
  .color{
    z-index: 1;
  }
  .border{
    z-index: 0;
    color: currentColor;
    circle{
      stroke: currentColor;
    }
  }
  &__time{
    font-weight: 300;
  }
  &.big{
    transform: scale(3);
  }
  @media screen and (max-width: $mobile-breakpoint) {
    font-size: em(12);
    width: em(46, 12);
    height: em(46, 12);
  }
}
</style>
