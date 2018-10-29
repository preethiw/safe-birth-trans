<template>
  <div class="bg-switch">
    <transition-group name="fade">
      <figure v-for="(item, index) in backgrounds" :style="bgPath(item)" :key="index" v-show="(index + 1) == current"></figure>
    </transition-group>
  </div>
</template>

<script>
// import {TweenMax, Power2, Linear} from 'gsap'

export default {
  name: 'BgSwitch',
  props: {
    backgrounds: Array,
    current: Number
  },
  data () {
    return {}
  },
  methods: {
    bgPath: function (img) {
      var src = require('../assets/images/' + img)
      return {'background-image': 'url(' + src + ')'}
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-switch{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  figure{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
  }
}
</style>
