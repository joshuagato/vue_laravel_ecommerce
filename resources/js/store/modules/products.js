const state = {
  products: [] || JSON.parse(localStorage.getItem('products')),
  categoryproducts: [] || JSON.parse(localStorage.getItem('categoryproducts')),
  // product: {} || JSON.parse(localStorage.getItem('product'))
  product: ''
};

const getters = {
  product: state => {
    return state.product
  }
};

const actions = {
  fetchAllProducts: async ({ commit }) => {
    let response = await axios.get('prod/fetchall');
    
    localStorage.setItem('products', JSON.stringify(response.data.products));
    commit('SET_PRODUCTS_SUCCESS', response.data.products);
  },

  fetchCategoryProducts: async ({ commit }, inputData) => {
    let response = await axios.post('prod/fetchcatprod', inputData);
    
    localStorage.setItem('categoryproducts', JSON.stringify(response.data.categoryproducts));
    commit('SET_CATPRODUCTS_SUCCESS', response.data.categoryproducts);
  },

  addNewProduct: async ({}, inputData) => {
    let response = await axios.post('prod/store', inputData);

    if (response.data.success) return response.data.success;
  },

  fetchOneProduct: async ({ commit }, productId) => {
    let response = await axios.get('prod/fetchone/' + productId);
    
    // localStorage.setItem('product', JSON.stringify(response.data.product));
    commit('SET_PRODUCT_SUCCESS', response.data.product);
  },

  updateProduct: async ({ commit }, { inputData, productId }) => {
    let response = await axios.post('prod/updateone/' + productId, inputData);

    commit('SET_PRODUCT_SUCCESS', response.data.product);
    if (response.data.success) return response.data.success;
  },

  deleteProduct: async ({ dispatch }, productId) => {
    let response = await axios.post('prod/deleteone/' + productId);

    if (response.data.success) {
      const inputData = { category: 0 }

      dispatch('fetchCategoryProducts', inputData);
      return response.data.success;
    };
  }
};

const mutations = {
  SET_PRODUCTS_SUCCESS: (state, data) => {
    state.products = data;
  },

  SET_CATPRODUCTS_SUCCESS: (state, data) => {
    state.categoryproducts = data;
  },

  SET_PRODUCT_SUCCESS: (state, data) => {
    state.product = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};