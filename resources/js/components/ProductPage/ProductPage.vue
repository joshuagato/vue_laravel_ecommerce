<template>
  <section id="product-page">
    <div id="product-details">
      <section class="image-section">
        <img :src="imageUrl + product.image" :alt="product.title">
      </section>
      <section class="details-section">
        <h4 class="product-title">{{ product.title }}</h4>
        <hr>
        <h1 class="product-price">$ {{ product.price }}</h1>
        <hr>
          <h5 class="product-description-heading">Product Details</h5>
          <p class="product-description">{{ product.description }}</p>
        <hr>
        
      </section>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  // props: ['productid'],
  data() {
    return {
      // imageUrl: 'http://127.0.0.1:8001/images/',
      imageUrl: 'https://joshgato-amazoned.herokuapp.com/images/',
    }
  },
  methods: {
    ...mapActions({
      fetchOneProductAction: 'products/fetchOneProduct'
    }),
    fetchOneProduct(id) {
      this.fetchOneProductAction(id);
    }
  },

  computed: {
    ...mapState('products', {
      product: state => state.product,
    }),
    // ...mapGetters({
    //   product: 'products/product'
    // })
  },

  created() {
    this.fetchOneProduct(this.$route.params.id);
  },

  mounted() {
    console.log(this.product)
  }
}
</script>

<style lang="scss" scoped>
#product-page {
  background: linear-gradient(rgba(228, 228, 228, 0.5), rgba(219, 219, 219, 0.3));
  font-family: 'Roboto';
  padding-top: 5rem;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  #product-details {
    background-color: #fff;
    // width: 100%;
    height: 20rem;
    display: flex;
    // padding: 1rem 0.5rem; //this line couldnt distribute the padding equally [findout later]

    .image-section {
      width: 20rem;
      height: 20rem;
      padding: 1rem 2rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .details-section {
      padding: 1rem 2rem;
      width: 40rem;
      height: 20rem;

      .product-title {
        font-size: 20px;
        color: #444444;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
      }

      .product-price {
        color: #505050;
        font-size: 28px;
      }

      .product-description-heading {
        color: #464646;
      }

      .product-description {
        color: #818181;
        font-size: 14px;
      }
    }
  }
}
</style>