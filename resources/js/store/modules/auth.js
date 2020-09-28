const state = {
  token: '' || localStorage.getItem('token'),
  user: '' || JSON.parse(localStorage.getItem('user')),
  errorMsg: '' || localStorage.getItem('errorMsg'),
  successMsg: '' || localStorage.getItem('successMsg')
};

const getters = {
  authenticated: state => {
    return state.token && state.user ? true : false;
  },

  user: state => state.user,

};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_USER: (state, data) => {
    state.user = data;
  },

  SET_ERROR: (state, message) => {
    state.errorMsg = message;
  },

  SET_SUCCESS: (state, message) => {
    state.successMsg = message;
  }
};

const actions = {
  signUp: async ({ commit }, formData) => {
    let response = await axios.post('auth/signup', formData);
    const result = response.data;

    if (response.data.success === true) {
      commit('SET_SUCCESS', result.successMsg);
      localStorage.setItem('successMsg', result.successMsg);
    } else {
      commit('SET_ERROR', result.errorMsg);
      localStorage.setItem('errorMsg', result.errorMsg);
    }
    
    return; // this returns a promise
  },

  signIn: async ({ dispatch }, credentials) => {
    let response = await axios.post('auth/signin', credentials);

    let returnedData = response.data.token ? response.data.token : response.data.message;

    if (response.data.token) return dispatch('attempt', returnedData);
  },

  attempt: async ({ commit, state }, token) => {
    if (token) {
      commit('SET_TOKEN', token);
      localStorage.setItem('token', token);
    }

    if (!state.token) return;

    try {
      let response = await axios.get('auth/me', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      commit('SET_USER', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));

    } catch (error) {
      console.log('Failed.');

      dispatch('resetState');
    }
  },

  signOut: ({ dispatch, state }) => {
    try {
      axios.post('auth/signout', {}, {
        headers: {
          'Authorization': 'Bearer ' + state.token
        }
      }).then(response => {
        // console.log('response', response.data);
      })
      .catch(error => {
        // console.log('error-back', error);
      });

      return dispatch('resetState');

    } catch (error) {
      console.log('Failed: ', error);
    }
  },

  resetState: ({ commit }) => {
    commit('SET_TOKEN', '');
    commit('SET_USER', '');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  resetMessages: ({ commit }) => {
    commit('SET_ERROR', '');
    commit('SET_SUCCESS', '');
    localStorage.removeItem('errorMsg');
    localStorage.removeItem('successMsg');
  },
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};