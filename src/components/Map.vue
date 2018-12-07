<template>
  <main class="wrap" :class="{menuOpened: $root.menuOpened}">
    <section class="map-statistics">
      <div class="map-content" ref="container">
        <div class="map-content__title1" ref="section1">
          <h2 class="title-h2" ref="title1">{{ $t("maps_main_title1") }}</h2>
        </div>
        <div class="map-content__title2" ref="section2">
          <h2 class="title-h2" ref="title2">{{ $t("maps_main_title2") }}</h2>
        </div>

        <div class="map-content__sharing" ref="mapSharing">
          <share-button-component v-on:click="sharing_popup2 = true" :class="{light: mapOn}"></share-button-component>
        </div>

        <div class="map-content__title3" ref="section3" v-if="$root.userLocation !== null">
          <h2 class="title-h2" ref="title3">
            {{ $t("looks_like_you_are_in") }}
            <span>{{locationName}}</span>
          </h2>
        </div>
        <!--<div class="map-zoom-legend" v-if="!mapActive"><span>{{ $t("double_tap_on_the_map_for_zoom") }}</span></div>-->
        <div class="map-legend" ref="legends">
          <div class="map-legend__map1" ref="legend1">
           {{ $t("maps_bottom_text") }}
            <div class="map-legend__bar">
              <span> {{ $t("low") }}</span> <i></i> <span> {{ $t("low") }}</span>
            </div>
          </div>
          <div class="map-legend__map2" ref="legend2">
            <span></span> {{ $t("maps_second_slide_bottom_text2") }} {{year}}
          </div>
        </div>
        <!--<div class="map-controls">
          <button v-on:click="zoomMap(1.2)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15"><path fill-rule="nonzero" d="M6.5 7.077V.73h1v6.346h6.346v1H7.5v6.346h-1V8.077H.154v-1H6.5z"/></svg></button>
          <button v-on:click="zoomMap(0.9)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2"><path fill-rule="nonzero" d="M.154 1.077v-1h13.692v1z"/></svg></button>
        </div>-->
        <div ref="map_buttons">
          <button class="map-control left" v-on:click="panMap('left')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 14"><path fill-rule="nonzero" d="M7.016 11.756v1.414L.83 6.984 7.016.797v1.414L2.244 6.984z"/></svg></button>
          <button class="map-control right" v-on:click="panMap('right')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 14"><path fill-rule="nonzero" d="M.83 11.756v1.414l6.186-6.186L.83.797v1.414l4.772 4.773z"/></svg></button>
        </div>

        <div class="map-content__toggle" :class="{on: mapOn}" ref="toggle">
          <p>{{ $t("compare_maps") }}</p>
          <button v-on:click="toggleMap"><span>{{ $t('togge_map') }}</span></button>
        </div>

        <div class="map-comparison" ref="comparison">
          <div class="map-comparison__content">
            <h3 class="title-h4" v-if="$root.userLocation">
              {{ $t("a_women_in") }} <story-dropdown-component></story-dropdown-component> {{ $t("coutnry_wise_comparison_text", {
              story_number : this.storyNumber,
              user_location : this.$root.dataUser.name
              }) }}
            </h3>
            <h3 class="title-h4" v-else>
              {{ $t("a_women_in") }} <story-dropdown-component></story-dropdown-component> {{ $t("coutnry_wise_comparison_text_1", {
              story_number : this.storyNumber,
              user_location : this.$root.dataUser.name
              }) }}
            </h3>
            <div class="map-comparison__actions">
              <router-link :to="'/' + $root.dataStory.name.toLowerCase()" class="link-default">{{ $t("see_the_story") }}</router-link>
              <share-button-component v-on:click="sharing_popup = true" :class="{small: isSmallHeight && $root.isMobile}"></share-button-component>
            </div>
          </div>
        </div>
      </div>
      <div class="map-statistics__map">
        <div class="pan-container" ref="pan_container">
          <div class="map-container">
            <div class="map" ref="map_container">
              <div class="map__clouds" ref="clouds" :style="{top: topData}"></div>
              <div class="map__data data1" ref="data1" :style="{top: topData}"></div>
              <div class="map__data data2" ref="data2" :style="{top: topData}"></div>
              <div class="map__canvas" ref="map"></div>
            </div>
          </div>
        </div>
        <!-- <d3-map-component ref="mapAnimations"></d3-map-component> -->
      </div>
    </section>
    <popup-component v-bind:openedClass="sharing_popup2" v-on:close="sharing_popup2 = false" class="popup-sharing">
      <div class="popup__content">
        <p class="title-h5" v-html="$t('map_popup_sharing_content')"></p>
        <div class="buttons">

          <a class="btn btn--primary" v-on:click="shareFacebook('Maternal deaths are not evenly distributed around the world. Find out how conflict and disaster, crisis and poverty threaten pregnant women’s lives, and join @UNFPA to support #SafeBirth even in the most challenging circumstances: safebirthevenhere.org', 'safebirth')">{{ $t("share_on_facebook")}}</a>
          <a class="btn btn--primary" v-on:click="shareTwitter('Maternal%20deaths%20are%20not%20evenly%20distributed%20around%20the%20world.%20Find%20out%20how%20conflict%20and%20disaster%2C%20crisis%20and%20poverty%20threaten%20pregnant%20women%E2%80%99s%20lives%2C%20and%20join%20%40UNFPA%20to%20support%20%23safebirth%20even%20in%20the%20most%20challenging%20circumstances%3A%20', 'safebirth', '')">{{ $t("share_on_twitter") }}</a>
        </div>
      </div>
    </popup-component>
    <popup-component v-bind:openedClass="sharing_popup" v-on:close="sharing_popup = false" class="popup-sharing">
      <div class="popup__content">
        <p class="title-h5">{{storyTweet}} <span>#SafeBirth #UNFPA</span></p>
        <div class="buttons">
          <a class="btn btn--primary" v-on:click="shareFacebook(storyTweet, 'safebirth')">{{ $t("share_on_facebook") }}</a>
          <a class="btn btn--primary" v-on:click="shareTwitter(storyTweet, 'safebirth', '')">{{ $t("share_on_twitter") }}</a>
        </div>
      </div>
    </popup-component>
    <transition name="fadescroll" appear>
      <div class="scroll-default" v-show="canScroll && slide != 1 && slide != 3 && slide != 5 && slide != 6"  v-on:click="move('next')">
        <scroll-down-component></scroll-down-component>
      </div>
    </transition>
  </main>
</template>

<script>
import PopupComponent from './Popup.vue'
import ScrollDownComponent from './ScrollDown'
import ShareButtonComponent from './ShareButton'
import StoryDropdownComponent from './StoryDropdown.vue'

import { TimelineMax, TweenMax, Linear, Power2 } from 'gsap'
import * as d3 from 'd3'

import sharing from './mixins/sharing.js'
import slide from './mixins/slide.js'

import * as panzoom from 'panzoom'

// var date = new Date()
// var year = date.getFullYear()

export default {
  name: 'Map',
  mixins: [sharing, slide],
  data () {
    return {
      controller: null,
      wh: 0,
      ww: 0,
      sharing_popup: false,
      sharing_popup2: false,
      year: 2018,
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
      topData: 0,
      mapOn: true,
      timelinesHelp: [],
      storiesMenu: false,
      location_loaded: false,
      panControler: null
    }
  },
  computed: {
    // dataText: function () {
    //   var text = this.storyTweet.replace(this.$root.dataStory.name, '<span class="primary-color">' + this.$root.dataStory.name + '</span>').replace(this.$root.dataUser.name, '<span class="primary-color">' + this.$root.dataUser.name + '</span>')

    //   return text
    // },
    locationName: function () {
      switch (this.$root.dataUser.name) {
        case 'United States':
        case 'United Kingdom':
        case 'United Arab Emirates':
        case 'Solomon Islands':
        case 'Russian Federation':
        case 'Republic of Korea':
        case 'Philippines':
        case 'Netherlands':
        case 'Maldives':
        case 'Kyrgyz Republic':
        case 'Islamic Republic of Iran':
        case 'former Yugoslav Republic of Macedonia':
        case 'former Federated States of Micronesia':
        case 'Dominican Republic':
        case 'Democratic People\'s Republic of Korea':
        case 'Bolivarian Republic of Venezuela':
        case 'Bahamas':
          return 'the ' + this.$root.dataUser.name
        default:
          return this.$root.dataUser.name
      }
    }
  },
  watch: {
    '$root.dataStory.name': function () {
      this.drawCountries()

      TweenMax.to('.country', 0.3, {color: '#151F36', ease: Linear.easeInOut})
      TweenMax.to('.country--active', 0.3, {color: '#D39084', ease: Linear.easeInOut})

      var feature2 = {type: 'FeatureCollection', features: [{geometry: this.featureStory}]}
      var mapZoom2 = this.getBouds(feature2, this.ww * 0.5)
      TweenMax.to(this.$refs.map_container, 0.7, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 0.5, ease: Power2.easeOut})

      this.drawPins()
    }
  },
  methods: {
    // nextPage: function () {
    //   this.canScroll = false
    //   this.$router.push(this.$root.dataStory.name)
    // },
    // prevPage: function () {
    //   this.$root.historyBack = true
    //   this.canScroll = false
    //   this.$router.push('/')
    // },
    isSmallHeight: function () {
      return window.outerHeight < 780
    },
    zoomMap: function (scale) {
      var self = this

      // reset
      if (scale === -1) {
        self.$refs.pan_container.style.transition = 'transform 0.3s linear'
        self.panControler.zoomTo(0, 0, 1 / self.panControler.getTransform().scale)
        self.panControler.moveBy(self.panControler.getTransform().x * -1, self.panControler.getTransform().y * -1)

        setTimeout(function () {
          self.$refs.pan_container.style.transition = 'none'
        }, 400)
      } else {
        this.$refs.pan_container.style.transition = 'transform 0.3s linear'
        this.panControler.zoomTo(this.$refs.pan_container.clientWidth / 2 + 20, this.$refs.pan_container.clientHeight / 2 + 10, scale)

        setTimeout(function () {
          self.$refs.pan_container.style.transition = 'none'
        }, 400)
      }
    },
    panMap: function (dx) {
      if (dx === 'right') {
        dx = this.$refs.pan_container.clientWidth / 2 * -1
        if (Math.abs(this.panControler.getTransform().x + dx) > (this.$refs.pan_container.clientWidth * 1 * this.panControler.getTransform().scale - this.$refs.pan_container.clientWidth)) {
          return
        }
      }
      if (dx === 'left') {
        dx = this.$refs.pan_container.clientWidth / 2
        if (Math.abs(this.panControler.getTransform().x) + dx < this.$refs.pan_container.clientWidth * 0.75) {
          return
        }
      }

      this.panControler.moveBy(dx, 0, true)
    },
    toggleMap: function () {
      this.mapOn = !this.mapOn
      if (this.mapOn) {
        TweenMax.fromTo(this.$refs.legend1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.data1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.map_container, 0.3, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', delay: 0.3, ease: Power2.easeOut})
        TweenMax.to(this.$refs.clouds, 0.3, {className: '+=dark', ease: Linear.easeInOut})
        TweenMax.fromTo('.country', 0.3, {color: '#EDEDED'}, {color: '#151F36', delay: 0.3, ease: Power2.easeOut})
        TweenMax.fromTo(this.$refs.legend2, 0.3, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.data2, 0.5, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut})
      } else {
        TweenMax.fromTo(this.$refs.legend2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.map_container, 0.3, {backgroundColor: '#0C1020'}, {backgroundColor: '#FFFFFF', delay: 0.3, ease: Power2.easeOut})
        TweenMax.to(this.$refs.clouds, 0.3, {className: '-=dark', ease: Linear.easeInOut})
        TweenMax.fromTo('.country', 0.3, {color: '#151F36'}, {color: '#EDEDED', delay: 0.3, ease: Power2.easeOut})
        TweenMax.fromTo(this.$refs.legend1, 0.3, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut})
        TweenMax.fromTo(this.$refs.data1, 0.5, {opacity: 0}, {opacity: 1, delay: 0.6, ease: Linear.easeInOut})
      }
    },
    resizeScene: function () {
      this.ww = window.innerWidth
      if (this.$root.isMobile) this.wh -= 56
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

      // if (this.$root.isMobile) {
      //   var self = this;
      //   setTimeout(function() {
      //     self.$refs.pan_container.style.transform = 'scale(2) translateX(0%) translateY(-3%)';
      //   }, 10000)
      //   this.panControler = panzoom(this.$refs.pan_container, {maxZoom: 2, minZoom: 1});
      //   if (this.$refs.pan_container)
      //     this.zoomMap(2.5);
      // }

      // p.moveBy(120, 0, true);
    },
    drawMaps: function (geojson) {
      this.mapLayer.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', this.path)
        .attr('stroke', 'none')
        .attr('fill', 'none')

      this.drawCountries()
      this.drawPins()

      var gTop = this.g._groups[0][0].getBoundingClientRect().top
      var gHeight = this.g._groups[0][0].getBoundingClientRect().height
      var gBottom = this.wh - gTop - gHeight + (this.$root.isMobile ? 56 : 0)
      var gDiff = (((gTop - gBottom) * 100) / (this.wh)) / 2
      this.topData = gDiff + '%'

      this.initTimelines()
    },
    drawCountries: function () {
      var that = this
      this.mapLayer.selectAll('path')
        .attr('class', function (feature) {
          if (that.$root.userLocation !== null) {
            if (feature.properties.name === that.$root.userLocation.country) {
              that.featureUser = feature.geometry
            }
          }

          if (feature.properties.name === that.$root.dataStory.name) {
            that.featureStory = feature.geometry
            return 'country country--active'
          } else {
            return 'country'
          }
        })
    },
    drawPins: function () {
      var that = this

      var countriesCoordinates = {
        'Haiti': {lon: -72.3545, lat: 18.5791, country: 'Haiti'},
        'Liberia': {lon: -9.3790, lat: 7, country: 'Liberia'},
        'Kenya': {lon: 38.5, lat: 3.5, country: 'Kenya'}
      }

      var pinStory = countriesCoordinates[this.$root.dataStory.name]

      if (pinStory) {
        this.pins = [pinStory]

        var pin = this.mapPins.selectAll('.pin')
          .remove()
          .exit()
          .data(this.pins)
          .enter()
          .append('g')
          .attr('class', function (d) {
            return 'pin pin--story'
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
          // .attr('dx', function (d) { return -10 })
          .attr('dy', function (d) {
            if (that.$root.isMobile) {
              return -3
            } else {
              return -10
            }
          })
          .text(function (d) { return d.country })
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('text-anchor', 'middle')

        // pin.append('circle')
        //   .attr('r', 5)
      }
    },
    getBouds: function (d, ww) {
      var bounds = this.path.bounds(d)

      var scale = 3
      if (this.$root.isMobile) scale = 6

      var translateX = (ww - scale * (bounds[1][0] + bounds[0][0])) / 2
      var translateY = (this.wh - scale * (bounds[1][1] + bounds[0][1])) / 2

      if (this.$root.isMobile && ww < this.ww) {
        translateX = (this.ww - scale * (bounds[1][0] + bounds[0][0])) / 2
        translateY = ((this.wh * 0.5) - scale * (bounds[1][1] + bounds[0][1])) / 2
      }

      return {x: translateX, y: translateY, scale: scale}
    },
    initTimelines: function () {
      var that = this

      TweenMax.defaultOverwrite = 3

      this.timelines[1] = new TimelineMax({paused: true,
        onComplete: function () {
          that.timelineComplete(4000)
          if (that.slide === 6 || (that.slide === 5 && that.$root.userLocation === null)) {
            TweenMax.to(that.$refs.clouds, 0.5, {opacity: 0, ease: Power2.easeInOut})
            TweenMax.to(that.$refs.map, 0.5, {opacity: 1, ease: Power2.easeInOut})
          }

          if (that.$root.isMobile) {
            that.panControler = panzoom(that.$refs.pan_container, {maxZoom: 4, minZoom: 1})
            if (that.$refs.pan_container) {
              that.zoomMap(4)
            }
          }
        }})
        .add([
          TweenMax.to(this.$refs.map_container, 0.01, {x: 0, y: 0, scale: 1, ease: Linear.easeNone}),
          TweenMax.fromTo(this.$refs.title1, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0, delay: 0.5, ease: Linear.easeInOut})
        ])

      this.timelines[2] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.section1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.legend1, 0.5, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map_buttons, 0.5, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.data1, 0.5, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut})
        ])

      this.timelines[3] = new TimelineMax({paused: true,
        onComplete: function () {
          that.timelineComplete(4000)
        }})
        .add([
          TweenMax.fromTo(this.$refs.legend1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.data1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map_container, 0.5, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', delay: 0.3, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.2, {opacity: 0}, {opacity: 0.9, ease: Linear.easeInOut}),
          TweenMax.to(this.$refs.clouds, 0.3, {className: '+=dark', ease: Linear.easeInOut}),
          TweenMax.fromTo('.country', 0.5, {color: '#EDEDED'}, {color: '#151F36', delay: 0.3, ease: Power2.easeOut}),
          TweenMax.fromTo('.country--active', 0.5, {color: '#EDEDED'}, {color: '#151F36', delay: 0.3, ease: Power2.easeOut}),
          // TweenMax.fromTo(this.$refs.map, 0.5, {color: '#EDEDED'}, {color: '#151F36', delay: 0.3, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.map_buttons, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.title2, 0.5, {opacity: 0}, {opacity: 1, delay: 0.8, ease: Linear.easeInOut, overwrite: 3})
        ])

      this.timelines[4] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.section2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.legend2, 0.3, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map_buttons, 0.3, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.data2, 0.7, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.mapSharing, 0.3, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.toggle, 0.3, {opacity: 0, display: 'none'}, {opacity: 1, display: 'block', delay: 0.3, ease: Linear.easeInOut})
        ])

      var pins = this.mapPins._groups[0][0]
      var feature1 = {type: 'FeatureCollection', features: [{geometry: this.featureUser}]}
      // var feature2 = {type: 'FeatureCollection', features: [{geometry: this.featureStory}]}
      var mapZoom = this.getBouds(feature1, this.ww)
      // var mapZoom2 = this.getBouds(feature2, this.ww * 0.5)

      this.timelines[5] = new TimelineMax({paused: true, onComplete: this.timelineComplete})
        .add([
          TweenMax.fromTo(this.$refs.toggle, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.legend2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          // TweenMax.fromTo(this.$refs.section2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.data2, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.mapSharing, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut})
        ])

      var comparisonAnimation = {
        duration: 0.5,
        from: {x: '100%'},
        to: {x: '0%', delay: 0.7, ease: Power2.easeOut}
      }

      if (this.$root.isMobile) {
        comparisonAnimation = {
          duration: 0.3,
          from: {opacity: 0},
          to: {opacity: 1, delay: 1.2, ease: Linear.easeInOut}
        }        
      }

      if (this.$root.userLocation === null) {
        this.timelines[5].add([
          // TweenMax.fromTo(this.$refs.map_container, 1, {x: 0, y: 0, scale: 1}, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 0.5, ease: Power2.easeInOut}),
          TweenMax.fromTo(this.$refs.comparison, comparisonAnimation.duration, comparisonAnimation.from, comparisonAnimation.to),
          TweenMax.fromTo(pins, 0.3, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut}),
          TweenMax.fromTo('.country--active', 0.3, {color: '#151F36'}, {color: '#D39084', delay: 0.7, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 0.5}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map, 0.5, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut})
        ])
      } else {
        this.timelines[5].add([
          TweenMax.fromTo(this.$refs.map_container, 0.7, {x: 0, y: 0, scale: 1}, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale, delay: 0.5, ease: Power2.easeInOut}),
          TweenMax.fromTo(this.$refs.map_buttons, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.clouds, 0.3, {opacity: 0.5}, {opacity: 0, ease: Linear.easeInOut}),
          // TweenMax.set(this.$refs.map, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.title3, 0.5, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map, 0.5, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut})
        ])

        this.timelines[6] = new TimelineMax({paused: true})
          .add([
            TweenMax.fromTo(this.$refs.section3, 0.5, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
            TweenMax.fromTo(this.$refs.clouds, 1.3, {opacity: 0}, {opacity: 0, ease: Linear.easeInOut}),
            TweenMax.fromTo(this.$refs.map, 0.3, {opacity: 1}, {opacity: 1, ease: Linear.easeInOut}),
            // TweenMax.set(this.$refs.map, {opacity: 0, ease: Linear.easeInOut}),
            // TweenMax.fromTo(this.$refs.map_container, 1, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale}, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 0.5, ease: Power2.easeInOut}),
            TweenMax.fromTo(this.$refs.comparison, comparisonAnimation.duration, comparisonAnimation.from, comparisonAnimation.to),
            TweenMax.fromTo(pins, 0.3, {opacity: 0}, {opacity: 1, delay: 0.7, ease: Linear.easeInOut}),
            TweenMax.fromTo('.country--active', 0.3, {color: '#151F36'}, {color: '#D39084', delay: 0.7, ease: Linear.easeInOut})
          ])
      }

      this.timelinesHelp[0] = new TimelineMax({paused: true})
        .add([
          TweenMax.fromTo(this.$refs.legend1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.data1, 0.3, {opacity: 1}, {opacity: 0, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map_buttons, 0.3, {opacity: 0}, {opacity: 1, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.to(this.$refs.clouds, 0.3, {className: '+=dark', ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.map_container, 0.3, {backgroundColor: '#FFFFFF'}, {backgroundColor: '#0C1020', delay: 0.3, ease: Power2.easeOut}),
          TweenMax.fromTo('.country', 0.3, {color: '#EDEDED'}, {color: '#151F36', delay: 0.3, ease: Power2.easeOut}),
          TweenMax.fromTo(this.$refs.toggle, 0.3, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut}),
          TweenMax.fromTo(this.$refs.title2, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0, delay: 0.6, ease: Linear.easeInOut})
        ])

      // this.timelinesHelp[1] = new TimelineMax({paused: true})
      //   .add([
      //     TweenMax.fromTo(this.$refs.data1, 0.5, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut})
      //     TweenMax.fromTo(this.$refs.legend1, 0.5, {opacity: 1}, {opacity: 0, delay: 0.3, ease: Linear.easeInOut}),
      //     TweenMax.fromTo(this.$refs.section1, 0.3, {opacity: 0}, {opacity: 1, ease: Linear.easeInOut}),
      //   ])

      // TweenMax.to(this.$refs.section1, 0.01, {opacity: 1, ease: Linear.easeNone})
      TweenMax.to(this.$refs.map_container, 0.01, {x: 0, y: 0, scale: 1, ease: Linear.easeNone})
      TweenMax.to(this.$refs.legend1, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.map_buttons, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.legend2, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.data1, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.clouds, 0.01, {opacity: 1, ease: Linear.easeNone})
      TweenMax.to(this.$refs.title1, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.data2, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.mapSharing, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.title2, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(pins, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to(this.$refs.map, 0.01, {opacity: 0, ease: Linear.easeNone})
      TweenMax.to('.country--active', 0.01, {color: '#EDEDED', ease: Linear.easeNone})

      this.firstSlide()
    },
    finishScrollBack: function () {
      var pins = this.mapPins._groups[0][0]
      var feature2 = {type: 'FeatureCollection', features: [{geometry: this.featureStory}]}
      var mapZoom2 = this.getBouds(feature2, this.ww * 0.5)
      TweenMax.to(this.$refs.map_container, 0.01, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, ease: Linear.easeNone})
      TweenMax.to(pins, 0.01, {opacity: 1, ease: Linear.easeNone})
      TweenMax.to('.country--active', 0.3, {color: '#D39084', ease: Linear.easeInOut})
      if (this.panControler && this.panControler.zoomTo) {
        this.zoomMap(-1)
      }
    },
    moveMap: function () {
      var feature2 = {type: 'FeatureCollection', features: [{geometry: this.featureStory}]}
      var mapZoom2 = this.getBouds(feature2, this.ww * 0.5)
      TweenMax.to(this.$refs.map_container, 1, {x: mapZoom2.x, y: mapZoom2.y, scale: mapZoom2.scale, delay: 0.5, ease: Power2.easeInOut})
    },
    animateSlide: function (newValue, oldValue) {
      var scrollDelay = 700
      var that = this
      // 4: compare maps; 5: location
      if (newValue > oldValue) { // Next
        // Map animation - timeline 5
        if (newValue === 5) {
          if (this.$root.isMobile) {
            this.zoomMap(-1)
          }

          // If user has toggle the map, reset the toggle and animate
          if (!this.mapOn) {
            this.toggleMap()
            setTimeout(function () {
              that.timelines[newValue].restart()
              if (that.$root.userLocation === null) that.moveMap()
            }, 1200)
          } else {
            this.timelines[newValue].restart()
            if (that.$root.userLocation === null) that.moveMap()
          }
        // Map zoom to story country
        } else if (newValue === 6) {
          if (this.$root.isMobile) {
            this.zoomMap(-1)
          }
          // Get the updated location
          this.timelines[newValue].restart()
          that.moveMap()
        } else {
          this.timelines[newValue].restart()
        }

        if ((newValue === 5 && this.$root.userLocation === null) || (newValue === 6)) {
          TweenMax.to('.country--active', 0.3, {color: '#D39084', delay: 0.7, ease: Linear.easeInOut})
        }
      } else { // Prev
        if (newValue === 3 && !this.mapOn) {
          this.timelinesHelp[0].restart()
          this.mapOn = true
        } else {
          this.timelines[oldValue].reverse()
        }

        // If user move back from zoomed map, reset the map
        if (newValue === 4 && this.$root.userLocation === null) {
          TweenMax.to(this.$refs.map_container, 0.5, {x: 0, y: 0, scale: 1, ease: Power2.easeInOut})
          TweenMax.to('.country--active', 0.01, {color: '#151F36', ease: Linear.easeNone})
          if (this.$root.isMobile) this.zoomMap(-1)
        } else if (this.$root.userLocation !== null) {
          if (this.$root.isMobile && that.$refs.pan_container) {
            that.zoomMap(4)
          }
        }

        if (newValue === 5 && this.$root.userLocation !== null) {
          if (this.$root.isMobile && that.$refs.pan_container) {
            this.zoomMap(-1)
          }

          var feature = {type: 'FeatureCollection', features: [{geometry: this.featureUser}]}
          var mapZoom = this.getBouds(feature, this.ww)
          TweenMax.to(this.$refs.map_container, 0.7, {x: mapZoom.x, y: mapZoom.y, scale: mapZoom.scale, ease: Power2.easeInOut})
          TweenMax.to('.country--active', 0.01, {color: '#151F36', ease: Linear.easeNone})
        }
      }

      return scrollDelay
    }
  },
  created () {
    this.location_loaded = this.$root.userLocation
    if (!this.$root.isMobile) window.addEventListener('resize', this.resizeScene)
  },
  destroyed () {
    if (!this.$root.isMobile) window.removeEventListener('resize', this.resizeScene)
  },
  updated () {
    if (!this.location_loaded && this.$root.userLocation != null) {
      this.location_loaded = true
      this.wh = window.innerHeight
      this.resizeScene()
    }
  },
  mounted () {
    this.wh = window.innerHeight
    this.resizeScene()
    // this.initTimelines()
  },
  components: {
    ScrollDownComponent,
    ShareButtonComponent,
    PopupComponent,
    StoryDropdownComponent
  }
}
</script>

<style lang="scss">
.map-statistics{
  position: relative;
}

.map-content{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  overflow: hidden;

  &__title1{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: em(1000);
    text-align: center;

    @media screen and (max-width: $mobile-breakpoint) {
      padding: 0 em(30);
      box-sizing: border-box;
      top: prc(50);
    }
  }

  &__title2{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: em(1200);
    text-align: center;
    color: #FFF;

    span{
      color: $color1;
    }

    @media screen and (max-width: $mobile-breakpoint) {
      padding: 0 em(30);
      box-sizing: border-box;
      top: prc(50);
    }
  }

  &__sharing{
    position: absolute;
    right: em(40);
    bottom: 15%;
    z-index: 10;

    @media screen and (max-width: $mobile-breakpoint) {
      display: none;
    }
  }

  &__title3{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #FFF;

    span{
      display: block;
      color: $color1;
    }
    @media screen and (max-width: $mobile-breakpoint) {
      top: prc(50);
    }
  }
  .title-h2{
    @media screen and (max-width: 1400px) {
      max-width: 700px;
      font-size: 4em;
      margin: 0 auto;
    }
    @media screen and (max-width: 1150px) {
      max-width: 600px;
      font-size: 3em;
      margin: 0 auto;
    }
    @media screen and (max-width: 950px) {
      max-width: 400px;
      font-size: 2em;
      margin: 0 auto;
    }
  }

  &__toggle{
    position: absolute;
    bottom: 14%;
    width: 100%;
    text-align: center;
    margin-bottom: em(20);
    transition: color 0.3s ease-in-out;

    @media screen and (max-width: $mobile-breakpoint) {
      bottom: calc(15% + 60px);
      margin: 0;
    }

    p{
      margin: 0;
      font-size: em(14);
      margin-bottom: em(5, 14);
    }

    button{
      cursor: pointer;
      font-size: 1em;
      display: block;
      width: em(120);
      height: em(36);
      border-radius: em(17);
      border: 1px solid #979797;
      box-sizing: border-box;
      margin: 0 auto;
      background: transparent;
      padding: 0 em(10);

      span{
        display: block;
        width: em(22);
        height: em(22);
        border-radius: 50%;
        text-indent: -9999px;
        background-color: #2C3E5A;
        transform: translateX(0%);
        transition: all 0.3s ease-in-out;
        margin: 0;
      }
    }

    &.on{
      color: #FFF;

      button{
        span{
          background-color: $color1;
          transform: translateX(350%);
        }
      }
    }
  }
  .map-zoom-legend{
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    justify-content: center;
    color: $color_body;
    font-size: 0.875em;
    line-height: 1em;
    display: none;
    @media screen and (max-width: 420px) {
      display: flex;
    }
  }
}

.map-statistics ~ .scroll-default{
  color: #BCBCBC;
  bottom: 5%;
  @media screen and (max-width: $mobile-breakpoint) {
    display: none;
  }
}

.map-comparison{
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  /*justify-content: center;*/
  align-items: center;
  padding: em(50);
  box-sizing: border-box;
  z-index: 5;
  @media screen and (max-height: 730px) {
    .title-h4{
      font-size: 2.625em;
    }
  }
  @media screen and (max-width: $mobile-breakpoint) {
    width: 100%;
    height: 60vh;
    top: 40vh;
    padding: em(25);
    align-items: flex-start;
    .title-h4{
      font-size: em(30);
    }
  }

  &__content{
    width: 100%;
    max-width: em(500);
    margin: 0 auto 0 0;
  }

  span{
    color: $color1;
  }

  /*&__story{
    color: #FF5539;
  }

  &__user{
    color: $color1;
  }*/

  &__actions{
    display: flex;
    justify-content: space-between;
    margin-top: em($margin_lg);

    .link-default{
      font-family: $font_title;
      font-size: em(28);
      margin-top: 4px;
      line-height: em(48, 24);
      color: #000;
    }

    .btn-share{
      margin: 0;
    }
    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column-reverse;
      align-items: center;
      .link-default{
        font-size: em(20);
        margin-top: 3em;
        &:after{
          transform: scale(1, 1);
        }

      }
    }
    @media screen and (max-width: $mobile-breakpoint) and (max-height: 780px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .link-default{
        margin: 0;
      }
    }
  }
  @media screen and (max-width: $mobile-breakpoint) and (max-height: 670px) {
    .title-h4{
      font-size: em(24);
    }
    &__actions{
      margin-top: 40px;
    }
  }
}
.map-legend{
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  font-size: em(14);
  line-height: 1em;
  text-align: center;

  @media screen and (max-width: $mobile-breakpoint) {
    bottom: 15%;
  }

  &__map1, &__map2{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;

    @media screen and (max-width: $mobile-breakpoint) {
      padding: 0 em(20);
      box-sizing: border-box;
    }
  }

  &__map1{
    color: $color_body;
  }
  &__map2{
    color: #FFF;

    > span{
      width: em(10, 12);
      height: em(10, 12);
      display: inline-block;
      vertical-align: middle;
      margin-right: em(10, 12);
      background-color: currentColor;
      border-radius: 50%;
      color: $color1;
    }
    @media screen and (max-width: $mobile-breakpoint) {
      line-height: 17px;
      width: 91%;
      left: 50%;
      transform: translateX(-46%);
      text-align: left;
      > span{
        display: block;
        transform: translateY(14px) translateX(-20px);
      }
    }
  }

  &__bar{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: em(10) 0 0;

    i{
      display: inline-block;
      /*background-image: -webkit-linear-gradient(left, #d7dde7 7%, #2C3E5A 87%);
      background-image: -o-linear-gradient(left, #d7dde7 7%, #2C3E5A 87%);
      background-image: linear-gradient(to right, #d7dde7 7%, #2C3E5A 87%);*/
      background-image: linear-gradient(90deg, #E2E7F1 9%, #4C6B9F 47%, #2C3E5A 87%);
      border-radius: 0.5em;
      height: 1em;
      width: em(150, 14);
      margin: 0 em(8, 14);
    }
  }
}
.map-controls{
  position: absolute;
  bottom: 160px;
  left: 30px;
  display: none;
  width: 86px;
  flex-wrap: wrap;
  transform: rotateZ(45deg);
  button{
    background: white;
    border: 1px solid #979797;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    padding: 9px;
    margin: 4px;
    svg{
      width: 100%;
      height: 100%;
      fill: #979797;
      transform: rotateZ(-45deg);
    }
    &:first-child, &:last-child{
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
  }
  @media screen and (max-width: $mobile-breakpoint) {
    display: flex;
  }
}
.map-control{
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 50%;
  display: none;
  background: transparent;
  border: 1px solid #979797;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 9px;

  svg{
    width: 100%;
    height: 100%;
    fill: #979797;
  }
  &.left{
    left: 20px
  }
  &.right{
    right: 20px;
  }
  @media screen and (max-width: $mobile-breakpoint) {
    display: flex;
  }
}
.map-statistics__map{
  overflow: hidden;
  .pan-container{
    @media screen and (max-width: $mobile-breakpoint) {
      position: relative;
      //transform: scale(2) translateX(0%) translateY(-3%);
      .map__data, .map__clouds{
        background-size: 86% auto;
      }
    }
  }
}

.map{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transform-origin: left top;

  @media screen and (max-width: $mobile-breakpoint) {
    width: 100%;
  }

  &__clouds{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    background-image: url(../assets/images/map_bg_2.png);
    &.dark{
      background-image: url(../assets/images/map_bg_black.png);
    }
  }

  &__data, &__clouds{
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
      //opacity: 0.3 !important;

      background-image: url(../assets/images/map1.png);
    }

    &.data2{
      background-image: url(../assets/images/map2.png);
    }
    @media screen and (max-width: $mobile-breakpoint) {
      /*background-size: 81%;
      background-position-x: 34%;*/
    }
    /*@media screen and (max-width: 430px) {
      background-size: 80%;
      background-position-x: 31%;
    }
    @media screen and (max-width: 330px) {
      background-size: 78%;
      background-position-x: 30%;
    }*/
  }

  &__canvas{
    transform-origin: left top;
    opacity: 0;
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
  font-weight: 300;
  font-size: em(6);
  /*stroke-dasharray: 1, 1;
  stroke-offset: 1, 1;*/

  @media screen and (max-width: $mobile-breakpoint) {
    font-size: em(3);
  }

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
  /*stroke: currentColor;*/

  &--active{
    /*color: $color1;*/
    stroke: none;
  }
}

.map-layer{
  background: url(../assets/images/map1.png) no-repeat center;
  -webkit-background-size: 100% auto;
  background-size: 100% auto;
}
</style>
