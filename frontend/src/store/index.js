import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState({
    paths: ['userInfo']
  })],
  state() {
    return {
      userInfo: null
    };
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    fetchUserInfo({ commit }, code) {
      return fetch(`http://localhost:3000/get-user-info?code=${code}`)
        .then(response => response.json())
        .then(data => {
          commit('setUserInfo', data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }
});
