<template>
  <div class="summary">
    <div class="summary_purchased">
      <h1>Summary</h1>
      <p>{{purchased}} items purchased</p>
    </div>
    <div class="summary_estimation">
      <p>{{estimation}}</p>
      <h2>{{estimate}} {{by}} {{courierchose}}</h2>
    </div>
    <div class="summary_payment">
      <p>{{paytitle}}</p>
      <h2>{{paymethod}}</h2>
    </div>
    <div class="summary_total">
      <div class="summary_cost">
        <p>Cost of goods</p>
        <p>{{cost}}</p>
        <p>{{dropTitle}}</p>
        <p>{{dropFee}}</p>
        <p>{{courierchose}} {{shipment}}</p>
        <p>{{pricechose}}</p>
        <h1>Total</h1>
        <h1>{{totalcomp}}</h1>
      </div>
      <router-link v-bind:class="{hide: hide}" v-bind:to="linkto" v-bind:event="isvalid">
        <button @click="changebtn">{{btntitle}}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    estimation: {
      type: String
    },
    linkto: {
      type: String
    },
    hide: {
      type: Boolean
    },
    paytitle: {
      type: String
    },
    paymethod: {
      type: String
    }
  },
  computed: {
    by () {
      return this.$store.state.by
    },
    shipment () {
      return this.$store.state.shipment
    },
    estimate () {
      return this.$store.state.estimate
    },
    courierchose () {
      return this.$store.state.courierchose
    },
    pricechose () {
      if (this.$store.state.pricechose > 0) {
        return this.$store.state.pricechose.toLocaleString()
      }
    },
    purchased () {
      return this.$store.state.purchased
    },
    cost () {
      return this.$store.state.cost.toLocaleString()
    },
    dropTitle () {
      return this.$store.state.dropFee.title
    },
    dropFee () {
      return this.$store.state.dropFee.cost.toLocaleString()
    },
    totalcomp () {
      return this.$store.state.totalcost.toLocaleString()
    },
    link () {
      return this.$store.state.btnlink
    },
    isvalid () {
      return this.$store.state.isvalid
    },
    btntitle () {
      return this.$store.state.btntitle
    }
  },

  methods: {
    validate () {
      this.$store.commit('validate')
    },
    changebtn () {
      this.validate()
      if (this.isvalid === 'click') {
        this.$store.commit('changeBtn')
      }
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
.summary {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  .summary_purchased {
    @include if-lessThan-768px {
      margin-bottom: 20px;
    }
    h1 {
      font-size: 20px;
      font-weight: bold;
      color: #ff8a00;
      @include if-lessThan-768px {
        font-size: 15px;
      }
    }
    p {
      margin-top: 7px;
      font-size: 16px;
      color: #656567;
      @include if-lessThan-768px {
        font-size: 12px;
      }
    }
  }
  .summary_estimation {
    h2 {
      font-size: 14px;
      font-weight: bold;
      color: #19d875;
    }
  }
  .summary_payment {
    h2 {
      font-size: 14px;
      font-weight: bold;
      color: #19d875;
    }
  }
  .summary_total {
    width: 100%;
    align-self: end;
    .hide {
      display: none;
    }
    .summary_cost {
      display: grid;
      grid-template-columns: 3fr 1fr;
      margin-bottom: 10px;
      @include if-lessThan-768px {
        margin-top: 20px;
      }
      p {
        font-size: 12px;
        margin-bottom: 5px;
        color: #656567;
        &:nth-child(even) {
          justify-self: end;
          font-weight: bold;
        }
      }
      h1 {
        font-size: 18px;
        margin-top: 20px;
        font-weight: bold;
        color: #ff8a00;
        &:nth-child(even) {
          justify-self: end;
        }
      }
    }
    button {
      width: 100%;
      height: 50px;
      border: none;
      background: #ff8a00;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
