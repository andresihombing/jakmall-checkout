<template>
  <div class="finish">
    <div class="finish__grid">
      <div class="finish__details">
        <h1>Thank You</h1>
        <h2>Order ID : {{randomize}}</h2>
        <p>Your order will be delivered {{estimate}} with {{courierchose}}</p>
        <router-link class="home" to="/" @click.native="resetstate">&larr; Go to homepage</router-link>
      </div>
      <app-summary
        v-bind:paytitle="paytitle"
        v-bind:paymethod="paymethod"
        v-bind:linkto="linkto"
        v-bind:hide="hide"
        v-bind:estimation="estimation"
      ></app-summary>
    </div>
  </div>
</template>

<script>
import summary from './Summary.vue'
export default {
  data () {
    return {
      linkto: '/',
      hide: true,
      estimation: 'Delivery Estimation',
      paymethod: this.$store.state.payment,
      paytitle: 'Payment Method',
      randomize: ''
    }
  },
  components: {
    'app-summary': summary
  },
  mounted () {
    // add random string
    function randomString (length, chars) {
      var result = ''
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
      return result
    }
    let rstring = randomString(
      5,
      '23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
    )
    this.randomize = rstring
  },
  computed: {
    estimate () {
      return this.$store.state.estimate
    },
    courierchose () {
      return this.$store.state.courierchose
    }
  },
  methods: {
    // reset state
    resetstate () {
      this.$store.replaceState({
        btnlink: 'Continue to payment',
        linkto: '/payment',
        purchased: 10,
        isvalid: '',
        cost: 500000,
        dropFee: {
          title: '',
          cost: ''
        },
        totalcost: 500000,
        checked: false,
        addrcount: {
          used: 0,
          left: 120
        },
        valid: {
          nameval: false,
          emailval: false,
          phoneval: false,
          addressval: false,
          droname: false,
          drophone: false
        },
        notvalid: {
          nameval: false,
          emailval: false,
          phoneval: false,
          addressval: false,
          droname: false,
          drophone: false
        },
        user: {
          name: '',
          phone: '',
          email: '',
          address: '',
          droname: '',
          drophone: '',
          active_payment: 1,
          active_shipment: 1
        },
        ewalletsaldo: 1500000,
        estimate: '',
        dayestimate: ['today', '2 days', '1 day'],
        courierchose: '',
        courier: ['GO-SEND', 'JNE', 'Personal Courier'],
        courierprices: [15000, 9000, 29000],
        pricechose: '',
        payment: '',
        paymethod: ['e-Wallet', 'Bank Transfer', 'Virtual Account'],
        by: '',
        shipment: '',
        btntitle: 'Continue to payment',
        changebtn: [
          'Pay with e-Wallet',
          'Pay with Bank Transfer',
          'Pay with Virtual Account'
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
@mixin if-lessThan-768px {
  @media (max-width: 768px) {
    @content;
  }
}
.finish {
  padding: 40px;
  height: 100%;
  @include if-lessThan-768px {
    padding: 25px;
    height: auto;
  }
  .finish__grid {
    display: grid;
    grid-template-columns: 3fr 2fr 2fr;
    height: 65vh;
    grid-gap: 25px;
    margin-top: 20px;
    align-items: center;
    justify-items: center;
    @include if-lessThan-768px {
      grid-template-columns: 1fr;
      grid-gap: 5px;
      height: 100%;
    }
    .finish__details {
      grid-column: 1/3;
      @include if-lessThan-768px {
        margin-bottom: 1px;
      }
      h1 {
        padding-bottom: -5px;
        margin-bottom: 25px;
        font-weight: bold;
        color: #ff8a00;
        font-size: 27px;
        position: relative;
        z-index: 1;
        &::after {
          position: absolute;
          content: " ";
          width: 8em;
          height: 7px;
          background: #e9e9ec;
          left: 0;
          z-index: -1;
          bottom: 2px;
        }
      }
      h2 {
        font-size: 16px;
        font-weight: bold;
      }
      p {
        color: grey;
        margin-top: 10px;
        font-size: 13px;
        margin-bottom: 70px;
      }
      .home {
        font-size: 15px;
        color: #616161;
      }
    }
  }
}
</style>
