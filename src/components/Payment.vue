<template>
  <div class="payment">
    <router-link to="/" class="payment_back" @click.native="changelink">
      <i class="fa fa-arrow-left"></i>
      <p>Back to delivery</p>
    </router-link>
    <div class="payment_grid">
      <div class="payment_details">
        <h1>Shipment</h1>
        <div class="payment_service">
          <div class="payment_courier" @click="activeShipment(1)" :class="{active: active_shipment == 1}">
            <div>
              <p>GO-SEND</p>
              <P style="margin-right:90px;">{{this.$store.state.courierprices[0].toLocaleString()}}</P>
            </div>
          </div>
          <div class="payment_courier" @click="activeShipment(2)" :class="{active: active_shipment == 2}">
            <div>
              <p>JNE</p>
              <P style="margin-right:93px;">{{this.$store.state.courierprices[1].toLocaleString()}}</P>
            </div>
          </div>
          <div class="payment_courier" @click="activeShipment(3)" :class="{active: active_shipment == 3}">
            <div>
              <p style="margin-right:20px;">Personal Courier</p>
              <P>{{this.$store.state.courierprices[2].toLocaleString()}}</P>
            </div>
          </div>
        </div>
        <h1>Payment</h1>
        <div class="shipment_service">
          <div class="shipment_courier" @click="activePayment(1)" :class="{activepay: active_payment == 1}">
            <div>
              <p>e-wallet</p>
              <p style="margin-right: 45px;">{{ewalletsaldo.toLocaleString()}} left</p>
            </div>
          </div>
          <div class="shipment_courier" @click="activePayment(2)" :class="{activepay: active_payment == 2}">
            <div>
              <p style="margin-right:40px;">Bank Transfer</p>
            </div>
          </div>
          <div class="shipment_courier" @click="activePayment(3)" :class="{activepay: active_payment == 3}">
            <div>
              <p style="margin-right:30px;">Virtual Account</p>
            </div>
          </div>
        </div>
      </div>
      <div class="payment_summary">
        <app-summary
          v-bind:estimation="estimation"
          v-bind:linkto="linkto"
        ></app-summary>
      </div>
    </div>
  </div>
</template>

<script>
import summary from './Summary.vue'
export default {
  components: {
    'app-summary': summary
  },
  data () {
    return {
      estimation: 'Delivery estimation',
      linkto: '/finish'
    }
  },
  computed: {
    ewalletsaldo () {
      return this.$store.state.ewalletsaldo
    },
    active_shipment () {
      return this.$store.state.user.active_shipment
    },
    active_payment () {
      return this.$store.state.user.active_payment
    },
    totalcost () {
      return this.$store.state.totalcost
    },
    pricechose () {
      return this.$store.state.pricechose
    }
  },
  methods: {
    activeShipment (index) {
      this.$store.commit('activeShipment', index)
    },
    activePayment (index) {
      this.$store.commit('activePayment', index)
    }
  },
  beforeUpdate () {
    this.$store.commit('updateTot')
  },
  mounted () {
    this.$store.commit('updateTot')
  }
}
</script>;

<style scoped lang="scss">
@mixin if-lessThan-768px {
  @media (max-width: 768px) {
    @content;
  }
}
body {
  font-family: Arial;
}
.payment {
  padding: 40px;
  height: 100%;
  @include if-lessThan-768px {
    padding: 25px;
  }
  .fa {
    font-size: 13px;
    margin-right: 10px;
    @include if-lessThan-768px {
      font-size: 12px;
    }
  }
  .payment_back {
    display: flex;
    align-items: center;
    color: #656567;
    @include if-lessThan-768px {
      font-size: 12px;
    }
  }
  .payment_grid {
    display: grid;
    height: 65vh;
    grid-template-columns: 3fr 2fr 2fr;
    grid-gap: 25px;
    margin-top: 20px;
    @include if-lessThan-768px {
      grid-template-columns: 1fr;
      grid-gap: 5px;
      height: 100%;
    }
    .payment_details {
      grid-column: 1/3;
      h1 {
        padding-bottom: -5px;
        margin-bottom: 25px;
        font-weight: bold;
        color: #ff8a00;
        font-size: 27px;
        position: relative;
        z-index: 1;
        @include if-lessThan-768px {
          font-size: 20px;
        }
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
      .payment_service {
        width: 85%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        margin-bottom: 65px;
        @include if-lessThan-768px {
          width: 100%;
          grid-gap: 5px;
        }
        .payment_courier {
          height: 55px;
          display: grid;
          align-items: center;
          justify-items: center;
          border: 2px solid #cecccc;
          cursor: pointer;
          position: relative;
          p {
            font-size: 13px;
            line-height: 1.6;
            @include if-lessThan-768px {
              font-size: 10px;
            }
          }
        }
        .active {
          border: 2px solid #7eeab4;
          background: #e5fce9;
          &::after {
            position: absolute;
            content: " ";
            width: 10px;
            height: 5px;
            border-left: 2px solid #7eeab4;
            border-bottom: 2px solid #7eeab4;
            right: 10px;
            top: 8px;
            transform: rotate(-45deg);
          }
        }
      }
      .shipment_service {
        @extend .payment_service;
        .shipment_courier {
          @extend .payment_courier;
        }
        .activepay {
          @extend .active;
        }
      }
    }
    .payment_summary {
      height: 100%;
      border-left: 2px solid #fff3e5;
      padding-left: 20px;
    }
  }
}
</style>
