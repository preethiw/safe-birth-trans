<template>
  <div class="map-container">
    <div class="map" ref="container">
      <div class="map__clouds" ref="clouds"></div>
      <div class="map__data data1" ref="data1" :style="{top: topData}"></div>
      <div class="map__data data2" ref="data2" :style="{top: topData}"></div>
      <div class="map__canvas" ref="map"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import { TimelineMax, TweenMax, Linear, Power2 } from 'gsap'
// import ScrollMagic from 'scrollmagic'
// import 'animation.gsap'

export default {
  name: 'D3Map',
  data () {
    return {
      controller: null,
      width: 0,
      height: 0,
      scale0: 0,
      projection: null,
      path: null,
      map: null,
      g: null,
      mapLayer: null,
      mapPins: null,
      pins: [],
      featureUser: null,
      featureStory: null,
      zoom: null,
      tooltip: null,
      app: null,
      topData: 0,
      clouds: [],
      timelines: [],
      slide: 0
    }
  },
  methods: {
    resizeMap: function () {
      this.ww = window.innerWidth
      this.wh = window.innerHeight
      this.scale0 = (this.ww - 1) / 2 / Math.PI
      this.initMap()
    },
    initMap: function () {
      this.$refs.map.innerHTML = ''

      this.projection = d3
        .geoNaturalEarth1()
        .center([ 0, 0 ])
        .scale(this.scale0)
        .translate([this.ww / 2, this.wh / 1.8])

      this.path = d3.geoPath().projection(this.projection)

      this.map = d3.select(this.$refs.map)
        .append('svg')
        .attr('width', this.ww)
        .attr('height', this.wh)

      this.g = this.map.append('g')

      this.mapLayer = this.g.append('g')
        .classed('map-layer', true)

      this.mapPins = this.g.append('g')
        .classed('map-pins', true)

      var json = require('../assets/data/world.json')
      this.drawMaps(json)
    },
    drawMaps: function (geojson) {
      var that = this

      var countriesCoordinates = {
        'Haiti': {lon: -72.3545, lat: 18.5791, country: 'Haiti'},
        'Liberia': {lon: -9.3790, lat: 6.4705, country: 'Liberia'},
        'Kenya': {lon: 33.4109, lat: 0.1650, country: 'Kenya'}
      }
      var pinStory = countriesCoordinates[this.$root.dataStory.name]
      this.pins = [pinStory]
      // this.pins = [this.$root.userLocation, pinStory]

      this.mapLayer.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .attr('class', function (feature) {
          if (that.$root.userLocation !== null) {
            if (feature.properties.name === that.$root.userLocation.country) {
              that.featureUser = feature.geometry
            }
          }
          if (feature.properties.name === that.pins[0].country) {
            that.featureStory = feature.geometry
          }
          return 'country'
        })
        // .attr('stroke-width', 1)
        .attr('stroke', 'none')
        .attr('fill', 'none')

      var pin = this.mapPins.selectAll('.pin')
        .data(this.pins)
        .enter()
        .append('g')
        .attr('class', function (d) {
          if (d.query === undefined) {
            return 'pin pin--story'
          } else {
            // return 'pin pin--user'
          }
        })
        // .attr('d', 'M5.75,0 C2.57107143,0 0,2.3475 0,5.25 C0,9.1875 5.75,15 5.75,15 C5.75,15 11.5,9.1875 11.5,5.25 C11.5,2.3475 8.92892857,0 5.75,0 Z')
        .attr('transform', function (d) {
          var position = that.projection([ d.lon, d.lat ])
          var zoom = 1
          var offsetLeft = 0
          var offsetTop = 0
          return 'translate(' + (position[0] - offsetLeft) + ', ' + (position[1] - offsetTop) + ') scale(' + zoom + ')'
        })
        .attr('vector-effect', 'non-scaling-stroke')

      pin.append('g')
        .append('text')
        .attr('dx', function (d) { return -10 })
        .attr('dy', function (d) { return -8 })
        .text(function (d) { return d.country })
        .attr('vector-effect', 'non-scaling-stroke')

      pin.append('circle')
        .attr('r', 5)

      var gTop = this.g._groups[0][0].getBoundingClientRect().top
      var gHeight = this.g._groups[0][0].getBoundingClientRect().height
      var gBottom = this.wh - gTop - gHeight
      var gDiff = (((gTop - gBottom) * 100) / this.wh) / 2
      this.topData = gDiff + '%'

      this.initTimelines()
    },
    getBouds: function (d, ww) {
      var bounds = this.path.bounds(d)
      // var dx = bounds[1][0] - bounds[0][0]
      // var dy = bounds[1][1] - bounds[0][1]
      // var x = (bounds[0][0] + bounds[1][0]) / 2
      // var y = (bounds[0][1] + bounds[1][1]) / 2

      // var scale = .9 / Math.max(dx / (this.ww/2), dy / this.wh)
      // if (scale>10) scale=10
      var scale = 3

      // var translateX = (this.ww  - dx * scale) - scale * x
      // var translateY = (this.wh - dy * 1.5) - scale * y
      var translateX = (ww - scale * (bounds[1][0] + bounds[0][0])) / 2
      var translateY = (this.wh - scale * (bounds[1][1] + bounds[0][1])) / 2

      return {x: translateX, y: translateY, scale: scale}
    },
    resizeScene: function () {
      this.wh = window.innerHeight
      this.resizeMap()
    },
    initTimelines: function () {
      // 1 map scene
      this.timelines[1] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.data1, 1, {opacity: 0}, {opacity: 1, delay: 3.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut})
        ])

      // 1 map scene BACK
      this.timelines[4] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 1}, {opacity: 0, delay: 0.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut})
        ])

      this.timelines[4].add([
        TweenMax.fromTo(this.$refs.container, 0.3, {backgroundColor: '#0C1020'}, {backgroundColor: '#FFFFFF', ease: Power2.easeOut}),
        TweenMax.fromTo(this.$refs.map, 0.3, {color: '#151F36'}, {color: '#EDEDED', ease: Power2.easeOut}),
        TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
        TweenMax.fromTo(this.$refs.data1, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut})
      ])

      // 2 map scene
      this.timelines[2] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.data1, 0.5, {opacity: 1}, {opacity: 0, delay: 0.5, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 1}, {opacity: 0, delay: 0.5, ease: Linear.easeInOut})
        ])

      this.timelines[2].add([
        TweenMax.fromTo(this.$refs.container, 0.5, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', ease: Power2.easeOut}),
        TweenMax.fromTo(this.$refs.map, 0.5, {color: '#EDEDED'}, {color: '#151F36', ease: Power2.easeOut}),
        TweenMax.fromTo(this.$refs.data2, 0.5, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut}),
        TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 0}, {opacity: 1, delay: 0.5, ease: Linear.easeInOut})
      ])

      // 3 map scene
      var feature1 = {type: 'FeatureCollection', features: [{geometry: this.featureUser}]}
      var feature2 = {type: 'FeatureCollection', features: [{geometry: this.featureStory}]}
      var mapZoom = this.getBouds(feature1, this.ww)
      var mapZoom2 = this.getBouds(feature2, this.ww * 0.5)

      var pins = this.mapPins._groups[0][0]

      this.timelines[5] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(pins, 0.3, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.to(this.$refs.container, 0.5, {x: 0, y: 0, scale: 1, delay: 0.3, ease: Linear.easeNone}),
          TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut})
        ])

      this.timelines[3] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        ])

      if (this.$root.userLocation === null) {
        this.timelines[3].add([
          TweenMax.fromTo(this.$refs.container, 1, {x: 0, y: 0, scale: 1}, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 0.5, ease: Power2.easeInOut}),
          TweenMax.fromTo(pins, 0.5, {opacity: 0}, {opacity: 1, delay: 1, ease: Linear.easeInOut})
        ])
      } else {
        this.timelines[3].add([
          TweenMax.fromTo(this.$refs.container, 0.7, {x: 0, y: 0, scale: 1}, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale, delay: 0.2, ease: Power2.easeInOut}),
          TweenMax.fromTo(this.$refs.container, 1, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale}, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 2.5, ease: Power2.easeInOut}),
          TweenMax.fromTo(pins, 0.5, {opacity: 0}, {opacity: 1, delay: 3, ease: Linear.easeInOut})
        ])
      }

      this.timelines[3].progress(0.01)

      // this.timelines[4] = new TimelineMax({paused: true})
      //   .add([
      //     TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
      //     TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
      //     TweenMax.fromTo(this.$refs.container, 1, {x: 0, y: 0, scale: 1}, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale, ease: Power2.easeInOut}),
      //     TweenMax.fromTo(this.$refs.container, 1, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale}, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 2, ease: Power2.easeInOut}),
      //     TweenMax.fromTo(pins, 0.5, {opacity: 0}, {opacity: 1, delay: 2.5, ease: Linear.easeInOut})
      //   ])

      if (this.slide === 0) {
        TweenMax.fromTo(this.$refs.container, 0.01, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale}, {x: 0, y: 0, scale: 1, ease: Power2.easeOut})
        TweenMax.to(this.$refs.data1, 0.01, {opacity: 0, ease: Linear.easeNone})
        TweenMax.to(this.$refs.clouds, 0.01, {opacity: 0, ease: Linear.easeNone})
        TweenMax.to(this.$refs.data2, 0.01, {opacity: 0, ease: Linear.easeNone})
      } else if (this.slide === 1) {
        this.timelines[3].progress(0)
        this.timelines[2].progress(0)
        TweenMax.to(this.$refs.container, 0.01, {x: 0, y: 0, scale: 1, ease: Power2.easeOut})
        TweenMax.to(this.$refs.data2, 0.01, {opacity: 0, ease: Linear.easeNone})
        this.timelines[1].progress(100)
      } else if (this.slide === 2) {
        this.timelines[3].progress(0)
        this.timelines[1].progress(100)
        TweenMax.to(this.$refs.container, 0.01, {x: 0, y: 0, scale: 1, ease: Power2.easeOut})
        this.timelines[2].progress(100)
      } else if (this.slide === 3) {
        this.timelines[1].progress(100)
        this.timelines[2].progress(100)
        this.timelines[3].progress(100)
      }
    },
    animateSlide: function (newValue, oldValue) {
      this.slide = newValue
      if (newValue > oldValue) {
        this.timelines[newValue].restart()
      } else {
        if (newValue === 1) {
          this.timelines[4].restart()
        } else if (newValue === 2) {
          this.timelines[5].restart()
        } else {
          this.timelines[oldValue].reverse()
        }
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resizeScene)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeScene)
  },
  mounted () {
    this.resizeMap()
  }
}
</script>

<style lang="scss">
.map{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transform-origin: left top;

  &__clouds{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  &__data{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    -webkit-background-size: 86.5% auto;
    background-size: 86.5% auto;
    background-repeat: no-repeat;
    background-position: center;

    &.data1{
      background-image: url(../assets/images/map1.png);
    }

    &.data2{
      background-image: url(../assets/images/map2.png);
    }
  }

  &__canvas{
    transform-origin: left top;
    /*width: 100%;
    height: 100%;
    overflow: hidden;

    svg{
      transform-origin: left top;
    }*/
  }
}

.pin{
  fill: currentColor;
  stroke: none;
  font-family: $font_title;
  /*font-weight: normal;*/
  font-size: em(8);
  /*stroke-dasharray: 1, 1;
  stroke-offset: 1, 1;*/

  &--user{
    stroke: $color1;
  }

  &--story{
    color: $color1;
  }
}

.country{
  /*color: #EDEDED;*/
  fill: currentColor;
  stroke: currentColor;
}

.country-active{
  /*fill: url(#texture0);*/
}

.map-layer{
  background: url(../assets/images/map1.png) no-repeat center;
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}
</style>
