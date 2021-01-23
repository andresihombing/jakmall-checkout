import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    btnlink: 'Continue to payment',
    linkto: '/payment',
    purchased: 10,
    isvalid: '',
    cost: 500000,
    dropFee: {
      title: '',
      cost: 0
    },
    totalcost: 500000,
    checked: false,
    addrcount: {
      used: 0,
      left: 120
    },
    valid: {
      emailval: false,
      phoneval: false,
      addressval: false,
      droname: false,
      drophone: false
    },
    notvalid: {
      emailval: false,
      phoneval: false,
      addressval: false,
      droname: false,
      drophone: false
    },
    user: {
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
    pricechose: 0,
    payment: '',
    paymethod: ['e-Wallet', 'Bank Transfer', 'Virtual Account'],
    by: '',
    shipment: '',
    btntitle: '',
    changebtn: [
      'Pay with e-Wallet',
      'Pay with Bank Transfer',
      'Pay with Virtual Account'
    ]
  },
  getters: {
    getValidate: state => {
      return (
        state.btnlink,
        state.linkto,
        state.purchased,
        state.isvalid,
        state.cost,
        state.dropFee,
        state.totalcost,
        state.checked,
        state.addrcount,
        state.valid,
        state.notvalid,
        state.user,
        state.ewalletsaldo,
        state.ewalletsaldo,
        state.estimate,
        state.dayestimate,
        state.courierchose,
        state.courier,
        state.courierprices,
        state.pricechose,
        state.payment,
        state.paymethod,
        state.by,
        state.shipment,
        state.btntitle,
        state.changebtn
      )
    }
  },
  mutations: {
    validate (state) {
      // validate user email || !emailIsValid
      const emailRegex = /^[a-z]+((_|\.|-)?[a-z\d]+)*@[a-z\d]+((-)?[a-z\d]+)*\.[a-z]{2,8}(\.[a-z]{2,8})?$/
      let emailIsValid = emailRegex.test(state.user.email)
      if (state.user.email === '' || !emailIsValid) {
        state.notvalid.emailval = true
        state.valid.emailval = false
      } else {
        state.notvalid.emailval = false
        state.valid.emailval = true
      }

      // validate user phone || !phoneIsValid
      const phoneRegex = /^(0|\+62|\(\d{3,4}\))[\d]{5,19}$/
      let phoneIsValid = phoneRegex.test(state.user.phone)
      if (state.user.phone === '' || !phoneIsValid) {
        state.notvalid.phoneval = true
        state.valid.phoneval = false
      } else {
        state.notvalid.phoneval = false
        state.valid.phoneval = true
      }

      // validate address this.user.address.length > 120 ||
      if (state.user.address === '' || state.user.address.length > 120) {
        state.notvalid.addressval = true
        state.valid.addressval = false
      } else {
        state.notvalid.addressval = false
        state.valid.addressval = true
      }
      state.addrcount.used = state.user.address.length

      // validate dropship name
      if (state.user.droname === '') {
        state.valid.droname = false
        state.notvalid.droname = true
      } else {
        state.valid.droname = true
        state.notvalid.droname = false
      }
      // validate dropship phone || !isValidPhoneDrop
      let isValidPhoneDrop = phoneRegex.test(state.user.drophone)
      if (state.user.drophone === '' || !isValidPhoneDrop) {
        state.valid.drophone = false
        state.notvalid.drophone = true
      } else {
        state.valid.drophone = true
        state.notvalid.drophone = false
      }

      // validate form
      if (!emailIsValid ||
        !phoneIsValid ||
        state.user.address.length > 120 ||
        state.user.address === ''
      ) {
        state.isvalid = ''
      } else if (state.checked) {
        if (state.user.droname === '' || !isValidPhoneDrop) {
          state.isvalid = ''
        } else {
          state.isvalid = 'click'
        }
      } else if (state.checked === false) {
        state.isvalid = 'click'
      }
    },
    activeShipment (state, index) {
      state.user.active_shipment = index
      state.estimate = state.dayestimate[index - 1]
      state.courierchose = state.courier[index - 1]
      state.pricechose = state.courierprices[index - 1]
      state.by = 'by'
    },
    activePayment (state, index) {
      state.user.active_payment = index
      state.btntitle = state.changebtn[index - 1]
      state.payment = state.paymethod[index - 1]
    },
    updateTot (state) {
      state.totalcost = 500000 + state.pricechose + state.dropFee.cost
    },
    changeBtn (state) {
      state.btntitle = 'Pay with e-Wallet'
      state.courierchose = 'GO-SEND'
      state.by = 'by'
      state.pricechose = 15000
      state.estimate = 'today'
    }
  },
  plugins: [createPersistedState()]
})
