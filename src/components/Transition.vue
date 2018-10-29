<template>
  <div class="wave-transition">
    <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ref="svg">
      <path class="wave-transition__path"></path>
      <path class="wave-transition__path"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Transition',
  data () {
    return {
      numPoints: 4,
      timeStart: null,
      duration: 1500,
      delayPointsArray: [],
      delayPointsMax: 180,
      delayPerPath: 70,
      path: null,
      isOpened: true
    }
  },
  methods: {
    animate: function () {
      this.timeStart = Date.now()

      for (var e = Math.random() * Math.PI * 2, r = 0; r < this.numPoints; r++) {
        var t = r / (this.numPoints - 1) * Math.PI * 2
        this.delayPointsArray[r] = (Math.sin(t + e) + 1) / 2 * this.delayPointsMax
      }

      this.renderLoop()
    },
    renderLoop: function () {
      var that = this
      this.render()

      if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
        requestAnimationFrame(function () {
          that.renderLoop()
        })
        // this.isAnimating = !1
      }
    },
    render: function () {
      if (this.isOpened) {
        for (var e = 0; e < this.path.length; e++) {
          this.path[e].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * e)))
        }
      } else {
        for (var r = 0; r < this.path.length; r++) {
          this.path[r].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - r - 1))))
        }
      }
    },
    updatePath: function (index) {
      var r = []
      for (var t = 0; t < this.numPoints; t++) {
        r[t] = 100 * this.cubicInOut(Math.min(Math.max(index - this.delayPointsArray[t], 0) / this.duration, 1))
      }

      var a = ''
      a += this.isOpened ? 'M 0 0 V ' + r[0] + ' ' : 'M 0 ' + r[0] + ' '

      for (var n = 0; n < this.numPoints - 1; n++) {
        var o = (n + 1) / (this.numPoints - 1) * 100
        var i = o - 1 / (this.numPoints - 1) * 100 / 2
        a += 'C ' + i + ' ' + r[n] + ' ' + i + ' ' + r[n + 1] + ' ' + o + ' ' + r[n + 1] + ' '
      }

      a += this.isOpened ? 'V 0 H 0' : 'V 100 H 0'

      return a
    },
    cubicInOut: function (e) {
      return e < 0.5 ? 4 * e * e * e : 0.5 * Math.pow(2 * e - 2, 3) + 1
    }
  },
  watch: {
    '$route.path': function () {
      this.animate()
    }
  },
  mounted () {
    this.path = this.$refs.svg.querySelectorAll('path')
  }
}
</script>

<style lang="scss" scoped>
.wave-transition{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  transform: rotate(180deg);

  &__path{
    &:nth-child(1){
      fill: $color1;
    }

    &:nth-child(2){
      fill: $color2;
    }
  }
}

button{
  position: absolute;
  top: 0;
  left: 0;
}

svg{
  width: 100%;
}
</style>
