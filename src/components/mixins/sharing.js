export default {
  data () {
    return {
      generalText: 'Every day, 830 women die giving birth – more than one  every two minutes. Join UNFPA to support safebirth.'
    }
  },
  computed: {
    storyNumber: function () {
      return Math.round(this.$root.dataUser.number / this.$root.dataStory.number)
    },
    storyTweet: function () {
      if (this.$root.userLocation === null) {
        return 'A woman in ' + this.$root.dataStory.name + ' is ' + this.storyNumber + ' times more likely to die giving birth than a woman in ' + this.$root.dataUser.name + ', the country with the world\'s lowest maternal mortality.'
      } else {
        return 'A woman in ' + this.$root.dataStory.name + ' is ' + this.storyNumber + ' times more likely to die in childbirth than a woman in ' + this.locationName
      }
    },
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
  methods: {
    shareTwitter: function (text, link, hashtags) {
      if (link.indexOf('safebirth') === 0) {
        link = window.location.origin + '/' + link
      }
      var url = 'http://twitter.com/share?text=' + text + '&url=' + link + '&hashtags=' + hashtags
      this.share(url)
    },
    shareFacebook: function (text, link) {
      // var url = 'https://www.facebook.com/sharer/sharer.php?u=' + link
      // this.share(url)

      if (link === 'safebirth') {
        //enable below while going live.
        //link = window.location.origin + '/safebirth'
        //Remove this while going live.
        link = 'https://www.unfpa.org/safebirth'
      }

      FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        display: 'popup',
        action_properties: JSON.stringify({
          object: {
          'og:url': link,
          'og:title': '',
          'og:description': text,
          'og:image': 'https://www.unfpa.org/sites/all/modules/unfpa_global_swop18/elements/entry/images/entry-1.jpg'
          }
        })
      })
    },
    share: function (url) {
      try {
        event.preventDefault()
      } catch (e) {

      }
      var winWidth = 700
      var winHeight = 500
      var winTop = (screen.height / 2) - (winHeight / 2)
      var winLeft = (screen.width / 2) - (winWidth / 2)

      window.open(url, 'Sharing', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight)
    }
  }
}
