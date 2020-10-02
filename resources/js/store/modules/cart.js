const state = {
  uuid: '' || localStorage.getItem('uuid'),
  cart: '' || JSON.parse(localStorage.getItem('cart')),
  cartitems: '' || JSON.parse(localStorage.getItem('cartitems')),
};

const actions = {
  createCart: async ({ dispatch }, inputData) => {
    const response = await axios.post('cart/createcart', inputData);

    if (response.data.success) {
      dispatch('fetchCart', inputData);
      localStorage.setItem('uuid', inputData.uuid);
    }
  },

  fetchCart: async ({ commit }, inputData) => {
    const response = await axios.post('cart/fetchcart', inputData);

    localStorage.setItem('cart', JSON.stringify(response.data.cart));
    localStorage.setItem('cartitems', JSON.stringify(response.data.cartitems));

    commit('SET_CART', response.data.cart);
    commit('SET_CART_ITEMS', response.data.cartitems);
  },

  addToCart: async ({ dispatch }, inputData) => {
    const response = await axios.post('cart/addtocart', inputData);

    if (response.data.success) {
      dispatch('fetchCart', inputData);
      return response.data.success;
    };
  },

  removeFromCart: async ({ dispatch, state }, inputData) => {
    const response = await axios.post('cart/removefromcart', inputData);
    
    if (response.data.success) {
      inputData.uuid = state.uuid; // Here, we just append uuid to the input data//Howwever, uuid alone is necessary here
    
      dispatch('fetchCart', inputData);
      return response.data.success;
    };
  },

  increaseItemQuantity: async ({ dispatch, state }, inputData) => {
    const response = await axios.post('cart/increaseitemquantity', inputData);
    
    if (response.data.success) {
      inputData.uuid = state.uuid;

      dispatch('fetchCart', inputData);
      return response.data.success;
    };
  },

  decreaseItemQuantity: async ({ dispatch, state }, inputData) => {
    const response = await axios.post('cart/decreaseitemquantity', inputData);
    
    if (response.data.success) {
      inputData.uuid = state.uuid;
      
      dispatch('fetchCart', inputData);
      return response.data.success;
    };
  },
};

const mutations = {
  SET_UUID: (state, data) => {
    state.uuid = data;
  },

  SET_CART: (state, data) => {
    state.cart = data;
  },

  SET_CART_ITEMS: (state, data) => {
    state.cartitems = data;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};