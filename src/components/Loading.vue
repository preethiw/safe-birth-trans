<template>
  <transition name="fade" mode="out-in">
    <div class="loading" v-if="$root.loading">
      <div class="loading__clock">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" :stroke-dashoffset="stroke">
          <circle cx="50" cy="50" r="47" stroke="white" stroke-width="1" fill="none"/>
        </svg>
        <p>loading...</p>
      </div>
    </div>
  </transition>
</template>

<script>
var axios = require('axios')

export default {
  name: 'Loading',
  data () {
    return {
      progress: 0
    }
  },
  computed: {
    stroke: function () {
      var stroke = (this.progress * 300) / 100
      return stroke - 300
    }
  },
  mounted () {
    var that = this
    var downloads = []
    var promises = []

    downloads.push(require('../assets/images/bg-Haiti.jpg'))
    downloads.push(require('../assets/images/bg-Kenya.jpg'))
    downloads.push(require('../assets/images/bg-Liberia.jpg'))
    downloads.push(require('../assets/images/opening-bg.jpg'))
    downloads.push(require('../assets/images/bg.jpg'))
    // downloads.push(require('../assets/images/bg-texture1.png'))
    // downloads.push(require('../assets/images/bg-texture2.png'))
    // downloads.push(require('../assets/images/bg-texture3.png'))
    // downloads.push(require('../assets/images/bg-texture4.png'))
    downloads.push(require('../assets/images/closing-bg.jpg'))
    downloads.push(require('../assets/images/bg-popup.jpg'))
    downloads.push(require('../assets/images/pledge-bg.jpg'))

    var n = 100 / downloads.length

    let config = {
      onDownloadProgress: progressEvent => {
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
        if (percentCompleted === 100) {
          that.progress += n
        }
      }
    }

    for (let i = 0; i < downloads.length; i++) {
      promises.push(axios.get(downloads[i], config))
    }

    axios.all(promises)
      .then(axios.spread(function (acct, perms) {
        that.progress = 100

        that.$nextTick(function () {
          setTimeout(function () {
            that.$root.loading = false
          }, 700)
        })
      }))
  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color_body;
  color: #FFF;
  z-index: 99;

  &__clock{
    position: absolute;
    top: calc(50% - 2.285715em);
    left: calc(50% - 2.285715em);
    cursor: pointer;
    font-size: em(30);
    width: em(64, 14);
    height: em(64, 14);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: currentColor;
    border: 1px solid rgba(255,255,255,0.2);
    position: relative;
    /*animation: clock 1s ease-out infinite alternate;*/

    &:before{
      content: "";
      display: block;
      width: 1px;
      height: em(3, 14);
      background-color: rgba(255,255,255,0.2);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
    }

    &:after{
      content: "";
      display: block;
      width: em(12, 14);
      height: em(4, 14);
      border: 1px solid rgba(255,255,255,0.2);
      position: absolute;
      top: em(-3);
      left: 50%;
      transform: translate(-50%, -100%);
      box-sizing: border-box;
      border-radius: em(3, 14);
    }

    svg{
      position: absolute;
      top: -3%;
      left: -3%;
      width: 106%;
      height: 106%;
      stroke-dasharray: 300;
      transition: all 0.7s cubic-bezier(.165,.84,.44,1);
      transform: rotate(-90deg);
    }

    p{
      font-size: em(9);
    }
  }
}

@keyframes clock{
  0% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-10%);
  }
}
</style>
