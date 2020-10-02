const state = {
  viewedproducts: '' || JSON.parse(localStorage.getItem('viewedproducts')),
}

const actions = {
  addToViewedProducts: async ({ dispatch }, inputData) => {
    const response = await axios.post('/viewed/addtoviewed', inputData);
    const success = response.data.success;

    if (success) dispatch('fetchViewedProducts', inputData.uuid);
  },

  fetchViewedProducts: async ({ commit }, vieweduuid) => {
    const response = await axios.get(`/viewed/fetchallviewed/${vieweduuid}`);
    const success = response.data.success;
    const products = response.data.products;

    if (success) {
      commit('SET_VIEWED_PRODUCTS_SUCCESS', products);
      localStorage.setItem('viewedproducts', JSON.stringify(products));
    }
  }
}

const mutations = {
  SET_VIEWED_PRODUCTS_SUCCESS: (state, data) => {
    state.viewedproducts = data;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}