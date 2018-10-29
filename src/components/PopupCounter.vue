<template>
  <div class="popup-counter">
    <div class="popup-counter__header">
        <counter-component></counter-component>
    </div>
    <div class="popup__content">
      <p class="popup-counter__total">While you've been here <span>{{$root.women}} {{counterDescription[0]}}</span> {{counterDescription[1]}} died in childbirth.</p>
      <p>But most maternal deaths can be prevented with skilled care and low-cost interventions.</p>
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
      if (this.$root.women === 1) {
        return ['woman', 'has']
      } else {
        return ['women', 'have']
      }
    },
    buttonLabel: function () {
      if (this.isSending) {
        return 'Sending...'
      } else {
        return 'Sign the pledge'
      }
    },
    donateLink: function () {
      if (this.$root.userLocation !== null && this.$root.userLocation.countryCode === 'US') {
        return 'https://secure2.convio.net/unfpa/site/Donation2?1721.donation=form1&df_id=1721&mfc_pref=T'
      } else {
        return 'https://secure2.convio.net/unfpa/site/Donation2'
      }
    }
  },
  methods: {
    subscribe: function () {
      if (this.isSending) return
      // var header = Authorization: `Bearer-${token}`
      // console.log({ name: this.name, email: this.email });

      // axios.defaults.headers.common['Authorization'] = 'Bearer a79fd3ab-9bbb-4a45-8620-c2cc810a6826'
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

      var corsURL = 'https://cors-anywhere.herokuapp.com/'
      var that = this
      this.message = ''
      this.isSending = true

      axios.post(corsURL + 'https://api.constantcontact.com/v2/contacts?api_key=b2ctbzfqbdjn8xbhe2tt83bm',
        {
          'lists': [
            {
              'id': '1106422680'
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
        that.message = 'Thank you for signing the pledge!'
        that.email = ''
        that.firstname = ''
        that.lastname = ''
        that.isSending = false
      }).catch(function (error) {
        that.isSending = false
        if (error === 'Error: Request failed with status code 400') {
          that.message = 'Invalid name or email'
        } else if (error === 'Error: Request failed with status code 409') {
          that.message = 'Email already subscribed'
        }
      })
    }
  },
  components: {
    CounterComponent
  }
}
</script>

<style lang="scss" scoped>
.popup-counter{
  .popup__content{
    padding: em(40) em(100);
  }

  &__total{
    font-size: em(30);
    line-height: em(45, 30);
    margin: 0;

    span{
      font-weight: bold;
    }
  }

  p{
    &:not(.popup-counter__total){
      font-size: em(18);
      margin: em(30, 18) 0 0;
    }
  }

  &__header{
    height: em(347);
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/images/bg.jpg) no-repeat center;
    background-size: cover;

    .counter{
      color: #FFF;
      font-size: em(60);
    }
  }
  @media screen and (max-width: $mobile_breakpoint) {
    &__header{
      height: em(297);
      background-size: 700px;
      background-position-x: 34%;
      .counter{
        width: 3.8em;
        height: 3.8em;
        font-size: 1.75em;
      }
    }
    .popup__content{
      padding: em(40) em(35);
    }
    &__total{
      font-size: em(22);
    }
    p:not(.popup-counter__total){
      font-size: em(14);
    }
  }
}
</style>
