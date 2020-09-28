const state = {
  categories: '' || JSON.parse(localStorage.getItem('categories')),
};

const getters = {
  
};

const actions = {
  fetchAllCategories: async ({ commit }) => {
    const response = await axios.get('cat/fetchall');

    localStorage.setItem('categories', JSON.stringify(response.data.categories));
    commit('SET_CATEGORIES', response.data.categories);
  }
};

const mutations = {
  SET_CATEGORIES: (state, data) => {
    state.categories = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};