const state = {
  categories: '' || JSON.parse(localStorage.getItem('categories')),
};

const actions = {
  fetchAllCategories: async ({ commit }) => {
    const response = await axios.get('cat/fetchall');
    const categories = response.data.categories;

    localStorage.setItem('categories', JSON.stringify(categories));
    commit('SET_CATEGORIES', categories);
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
  actions,
  mutations
};