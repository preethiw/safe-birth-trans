export default {
  data () {
    return {
      slide: 0,
      canScroll: false,
      timelines: [],
      timeout: null
    }
  },
  methods: {
    move: function (direction) {
      var total = this.timelines.length - 1

      if (this.canScroll) {
        clearTimeout(this.timeout)

        if (direction === 'next') {
          if (this.slide === total) {
            // this.canScroll = false
            this.nextPage()
          } else if (this.slide < total) {
            this.canScroll = false
            this.slide++
          }
        } else {
          if (this.slide > 1) {
            this.canScroll = false
            this.slide--
          } else {
            // this.canScroll = false
            this.prevPage()
          }
        }
      }
    },
    timelineComplete: function (time) {
      var t = 2000
      if (time > 0) {
        t = time
      }

      var slide = this.slide
      if (this.slide < (this.timelines.length - 1)) {
        var that = this
        this.timeout = setTimeout(function () {
          if (slide === that.slide) {
            that.slide++
          }
        }, t)
      }
    },
    nextPage: function () {
      var current = this.$root.menuOrder.indexOf(this.$route.path.toLowerCase())
      if (current < this.$root.menuOrder.length) {
        var next = this.$root.menuOrder[current + 1]
        this.canScroll = false
        this.$router.push(next)
      }
      return false
    },
    prevPage: function () {
      var current = this.$root.menuOrder.indexOf(this.$route.path.toLowerCase())
      if (current > 0) {
        var prev = this.$root.menuOrder[current - 1]
        this.$root.historyBack = true
        this.canScroll = false
        this.$router.push(prev)
      } else {
        return false
      }
    },
    animateSlide: function (newValue, oldValue) {
      if (newValue > oldValue) {
        this.timelines[newValue].restart()
      } else {
        this.timelines[oldValue].reverse()
      }

      return 2000
    },
    firstSlide: function () {
      this.$nextTick(function () {
        if (!this.$root.loading) {
          if (this.$root.historyBack) {
            this.$root.historyBack = false
            this.slide = (this.timelines.length - 1)
          } else {
            this.slide = 1
          }
        }
      })
    },
    finishScrollBack: function () {
      return false
    }
  },
  watch: {
    slide: function (newValue, oldValue) {
      var that = this
      this.canScroll = false
      var scrollDelay = 700

      if (newValue === (this.timelines.length - 1) && oldValue === 0 && newValue > 1) {
        for (var i = 1; i < this.timelines.length; i++) {
          this.timelines[i].progress(100)
        }
        this.finishScrollBack()
      } else {
        // if (oldValue > 0) this.timelines[oldValue].progress(100)
        // if (newValue < oldValue) this.timelines[oldValue].progress(0).pause()
        scrollDelay = this.animateSlide(newValue, oldValue)
      }

      setTimeout(function () {
        that.canScroll = true
      }, scrollDelay)
    },
    '$root.loading': function () {
      this.$nextTick(function () {
        this.slide = 1
      })
    }
  },
  beforeDestroy () {
    this.$parent.$off('slide')
  },
  created () {
    this.slide = 0
    this.$parent.$on('slide', this.move)
    if (this.$root.loading) this.canScroll = true
  }
}
