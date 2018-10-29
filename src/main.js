// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'

// Vue.use(VueResource)

// var VueScrollTo = require('vue-scrollto')
// Vue.use(VueScrollTo)

Vue.config.productionTip = false
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    loading: true,
    lang: document.documentElement.lang,
    menuOpened: false,
    menuOrder: [],
    scrolled: false,
    isMobile: false,
    isTablet: false,
    women: null,
    counter: 120,
    userLocation: null,
    counterPopup: false,
    dataUser: {name: '', number: 0},
    dataStory: {name: '', number: 0},
    historyBack: false,
    popupOpened: false
  },
  methods: {
    testBrowser: function (browser) {
      var result

      switch (browser) {
        case 'safari':
          result = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]' })(!window['safari'] || (typeof window.safari !== 'undefined' && window.safari.pushNotification))
          break
        case 'safari mobile':
          result = /iPhone/i.test(navigator.userAgent) && /Safari/i.test(navigator.userAgent)
          break
        case 'samsung':
          result = /SamsungBrowser/.test(navigator.userAgent)
          break
        case 'chrome':
          result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent)
          break
        case 'chrome mobile':
          result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent) && !window.chrome.webstore
          break
        case 'firefox mobile':
          result = !/Chrome/.test(navigator.userAgent) && /Mozilla/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent)
          break
        case 'firefox':
          result = !/Chrome/.test(navigator.userAgent) && /Mozilla/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent)
          break
        case 'ie':
          result = /MSIE/.test(window.navigator.userAgent) || /NET/.test(window.navigator.userAgent)
          break
        case 'edge':
          result = /Edge/.test(window.navigator.userAgent)
          break
        default:
          result = false
          break
      }
      return result
    }
  },
  components: { App },
  template: '<App/>'
})
