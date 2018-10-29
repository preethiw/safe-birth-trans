<template>
  <div class="popup-action">
    <div class="popup__content" ref="container">
      <p>I stand with UNFPA to end maternal deaths. Each of us can make a difference by raising awareness about a pregnant woman’s right to a #SafeBirth, no matter where she lives.</p>
      <form @submit.prevent="subscribe" v-if="!isUS">
        <p>{{message}}</p>
        <input type="text" placeholder="Your first name" v-model="firstname" required>
        <input type="text" placeholder="Your last name" v-model="lastname" required>
        <input type="email" placeholder="Your email" v-model="email" required>
        <button class="btn btn--primary">{{buttonLabel}}</button>
      </form>
      <a href="https://secure2.convio.net/unfpa/site/SSurvey?ACTION_REQUIRED=URI_ACTION_USER_REQUESTS&SURVEY_ID=1543" target="_blank" class="btn btn--primary" v-else>Join</a>
      <p class="div">and / or</p>
      <a :href="donateLink" target="_blank" class="btn btn--default">Donate</a>
    </div>
  </div>
</template>

<script>
import CounterComponent from './Counter'
var axios = require('axios')

export default {
  name: 'PopupAction',
  props: {
    openedClass: Boolean
  },
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      isSending: false
    }
  },
  computed: {
    isUS: function () {
      if (this.$root.userLocation && this.$root.userLocation.countryCode === 'US') {
        return true
      } else {
        return false
      }
    },
    counterDescription: function () {
      if (this.$root.women > 1) {
        return 'women have'
      } else {
        return 'woman has'
      }
    },
    buttonLabel: function () {
      if (this.isSending) {
        return 'Sending...'
      } else {
        return 'Join'
      }
    },
    donateLink: function () {
      if (this.$root.userLocation !== null && this.$root.userLocation.countryCode === 'US') {
        return 'https://secure2.convio.net/unfpa/site/Donation2?1721.donation=form1&df_id=1721&mfc_pref=T'
      } else {
        return 'https://www.unfpa.org/donate'
      }
    }
  },
  methods: {
    reset: function () {
      this.email = ''
      this.firstname = ''
      this.lastname = ''
    },
    subscribe: function () {
      if (this.isSending) return
      // var header = Authorization: `Bearer-${token}`
      // console.log({ name: this.name, email: this.email });

      // axios.defaults.headers.common['Authorization'] = 'Bearer a79fd3ab-9bbb-4a45-8620-c2cc810a6826'
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

      // var corsURL = ''
      // 'https://cors-anywhere.herokuapp.com/'
      var corsURL = window.location.origin + '/sites/all/themes/unfpa_global'
      var that = this
      this.message = ''
      this.isSending = true

      axios.post(corsURL + '/proxy.php',
        {
          'lists': [
            {
              'id': '1959992505'
            }
          ],
          'confirmed': false,
          'email_addresses': [
            {
              'email_address': this.email
            }
          ],
          'first_name': this.firstname,
          'last_name': this.lastname
        }, {
          headers: {
            'Authorization': 'Bearer a79fd3ab-9bbb-4a45-8620-c2cc810a6826'
          }
        }).then(function (response) {
        if (response.data.status !== undefined) {
          that.message = 'Thank you for signing the pledge!'
          that.email = ''
          that.firstname = ''
          that.lastname = ''
        } else {
          that.message = response.data[0].error_message
        }

        that.isSending = false
      })
    }
  },
  mounted: function () {
    var mobile = this.$root.isMobile

    this.$refs.container.querySelectorAll('input').forEach(function (obj) {
      obj.addEventListener('focus', function () {
        if (mobile) document.getElementById('app').classList.add('keyboard-openned')
      })

      obj.addEventListener('blur', function () {
        if (mobile) document.getElementById('app').classList.remove('keyboard-openned')
      })
    })
  },
  components: {
    CounterComponent
  }
}
</script>

<style lang="scss" scoped>
.popup-action{
  display: flex;

  p{
    font-size: em(18);
  }

  form{
    margin-top: em(40);

    p{
      font-size: em(14);
      margin: 0 0 em(10, 14);
    }

    input{
      font-weight: 300;
      font-size: em(14);
      height: em(38, 14);
      line-height: em(38, 14);
      letter-spacing: em(0.2, 14);
      /*color: #878787;*/
      width: 100%;
      border: none;
      border-bottom: 1px solid #CBCBCB;
      margin-bottom: em(30, 14);
    }
  }

  p.div{
    font-size: em(13);
    color: #D4D4D4;

    &:before, &:after{
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: em(60, 13);
      border-top: 1px solid currentColor;
      margin: 0 em(10, 13);
    }
  }

  @media screen and (max-width: 1580px) {
    .popup{
      &__content{
        width: em(600);
        padding: em(60);
      }
    }

    p{
      font-size: em(14);
    }
  }

  @media screen and (max-width: $mobile_breakpoint) {
    display: block;

    .popup{
      &__content{
        width: 100%;
        padding: em(40) em(20);
        > p:first-child{
          font-size: em(20);
          text-align: left;
          margin-top: 0;
        }
        .btn--default:last-child{
          margin-bottom: 2.5em;
        }
      }
    }
  }
}
</style>
