const state = {
  products: '' || JSON.parse(localStorage.getItem('products')),
  categoryproducts: '' || JSON.parse(localStorage.getItem('categoryproducts')),
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
    const response = await axios.get('prod/fetchall');
    const products = response.data.products;
    
    localStorage.setItem('products', JSON.stringify(products));
    commit('SET_PRODUCTS_SUCCESS', products);
  },

  fetchCategoryProducts: async ({ commit }, inputData) => {
    const response = await axios.post('prod/fetchcatprod', inputData);
    const categoryproducts = response.data.categoryproducts;

    localStorage.setItem('categoryproducts', JSON.stringify(categoryproducts));
    commit('SET_CATPRODUCTS_SUCCESS', categoryproducts);
  },

  addNewProduct: async ({}, inputData) => {
    const response = await axios.post('prod/store', inputData);
    const success = response.data.success;

    if (success) return success;
  },

  fetchOneProduct: async ({ commit }, productId) => {
    const response = await axios.get(`prod/fetchone/${productId}`);
    
    // localStorage.setItem('product', JSON.stringify(response.data.product));
    commit('SET_PRODUCT_SUCCESS', response.data.product);
  },

  updateProduct: async ({ commit }, { inputData, productId }) => {
    const response = await axios.post(`prod/updateone/${productId}`, inputData);
    const success = response.data.success;
    const product = response.data.product;

    if (success) {
      commit('SET_PRODUCT_SUCCESS', product);
      return success;
    }
  },

  deleteProduct: async ({ dispatch }, productId) => {
    const response = await axios.post(`prod/deleteone/${productId}`);
    const success = response.data.success;

    if (success) {
      const inputData = { category: 0 };
      dispatch('fetchCategoryProducts', inputData);
      return success;
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