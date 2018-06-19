import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const uri = 'https://crypto-signals-app.herokuapp.com/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allSignals: [],
    signals: [],
    gems: [],
    noItemFound: false,
    isListLoaded: false,
    error: false,
  },
  getters: {
  },
  mutations: {
    /* eslint-disable */
    SET_ALL_SIGNAL_LIST: (state, list) => {
      state.allSignals = list;
    },
    SET_SIGNAL_LIST: (state, list) => {
      state.signals = list;
    },
    SET_GEM_LIST: (state, list) => {
      state.gems = list.filter(item => item.isGem === true);
    },
    SET_NO_ITEM_FOUND_TRUE: (state) => {
      state.noItemFound = true;
    },
    SET_NO_ITEM_FOUND_FALSE: (state) => {
      state.noItemFound = false;
    },
    SET_LIST_LOADED_TRUE: (state) => {
      state.isListLoaded = true;
    },
    SET_LIST_LOADED_FALSE: (state) => {
      state.isListLoaded = false;
    },
    SET_ERROR_TRUE: (state) => {
      state.error = true;
    },
    /* eslint-enable */
  },
  actions: {
    LOAD_SIGNAL_LIST: ({ commit }) => {
      axios.get(`${uri}/signals`)
        .then((res) => {
          if (res.data.length === 0) {
            commit('SET_NO_ITEM_FOUND_TRUE');
          } else {
            commit('SET_ALL_SIGNAL_LIST', res.data);
            commit('SET_SIGNAL_LIST', res.data);
            commit('SET_GEM_LIST', res.data);
          }
          commit('SET_LIST_LOADED_TRUE', res.data);
        })
        .catch(() => {
          commit('SET_ERROR_TRUE');
        });
    },
    SEARCH_COIN: ({ commit, state }, payload) => {
      const { allSignals } = state;
      const coin = payload.coin.toLowerCase();
      let newSignals = allSignals.filter(signal => signal.name.toLowerCase() === coin);
      if (newSignals.length === 0) {
        newSignals = allSignals.filter(signal => signal.ticker.toLowerCase() === coin);
      }
      if (newSignals.length > 0) {
        commit('SET_SIGNAL_LIST', newSignals);
        commit('SET_NO_ITEM_FOUND_FALSE');
      } else {
        commit('SET_NO_ITEM_FOUND_TRUE');
      }
    },
    SEARCH_EXCHANGE: ({ commit, state }, payload) => {
      const { allSignals } = state;
      const ex = payload.exchange.toLowerCase();
      const newSignals = allSignals.filter(signal => signal.exchanges.includes(ex));
      if (newSignals.length > 0) {
        commit('SET_SIGNAL_LIST', newSignals);
        commit('SET_NO_ITEM_FOUND_FALSE');
      } else {
        commit('SET_NO_ITEM_FOUND_TRUE');
      }
    },
  },
});
