import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    methods: [
      {
        value: 'GET',
        label: 'GET',
      },
      {
        value: 'POST',
        label: 'POST',
      },
      {
        value: 'PUT',
        label: 'PUT',
      },
      {
        value: 'DELETE',
        label: 'DELETE',
      },
    ],
    contentTypes: [
      {
        value: 'application/x-www-form-urlencoded',
        label: 'application/x-www-form-urlencoded',
      },
      {
        value: 'application/json',
        label: 'application/json',
      },
      {
        value: 'multipart/form-data',
        label: 'multipart/form-data',
      },
      {
        value: 'text/xml',
        label: 'text/xml',
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
