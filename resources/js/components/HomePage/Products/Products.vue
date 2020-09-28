<template>
  <section id="products-section" ref="products-section">
      <section class="padding-section">
        <section class="section-heading pb-5">
          <h3>Hot Products</h3>
          <span>These products are the real deal.</span>
        </section>

        <section class="products">
            <div ref="product" v-for="product in products" :key="product.id" class="product rotate" 
              tabindex="0" title="Click me">
              <div class="product-container">
                <section class="picture-section">
                  <img :src="'images/' + product.image" :alt="product.title">
                </section>
                <section class="info-section">
                  <p class="product-category text-center mt-3 mb-3">
                    <span class="pl-1">{{ fetchOneCategoryMethod(product.category) }}</span>
                  </p>
                  <h6 class="product-name text-center mb-3">{{ product.title }}</h6>
                  <p class="product-price text-center">${{ product.price }}</p>
                </section>
              </div>

              <div class="product-back">
                <div class="product-back-content">
                  <p class="">Pay ${{ product.price }}</p>
                  <a href="" class="button mb-2" @click.prevent="addToCart(product.id)">
                    Add to Cart</a>
                  <router-link :to="'/product/' + product.id">
                  <!-- <router-link :to="{ name: 'product', params: { productid: product.id }}"> -->
                  <!-- <router-link :to="{ name: 'product', params: {id: product.id} }"> -->
                    <span class="button">Details</span>
                  </router-link>
                </div>
              </div>
            </div>
        </section>
      </section>
  </section>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      
    }
  },

  methods: {
    ...mapActions({
      fetchAllProductsAction: 'products/fetchAllProducts',
      addToCartAction: 'cart/addToCart',
    }),
    fetchOneCategoryMethod(id) {
      const category = this.categories.find(element => element.id === parseInt(id));
      return category.title;
    },
    addToCart(productId) {

      const inputData = {
        uuid: this.uuid,
        productId: productId
      }
      
      this.addToCartAction(inputData).then(response => {
        // if (response) this.$router.replace('/cart');
        if (response) {
          swal("Added to Cart!", {
            icon: "success",
            buttons: false,
            timer: 1800,
          });
        }
      })
      .catch(error => console.log('error', error));
    },

    productsAnimation() {
      const productSection = this.$refs['products-section'];
      const productSectionPositionFromTop = productSection.offsetTop;
      const productSectionHeight = productSection.offsetHeight;
      const product = this.$refs.product;

      const pageYOffset = window.pageYOffset;
      const scrollTopValue = window.scrollY;

      if (pageYOffset > (productSectionPositionFromTop - productSectionHeight * 20/100) || scrollTopValue > (productSectionPositionFromTop - productSectionHeight * 20/100)) {
        product.forEach(element => {
          element.classList.add('moveFromBack');
        });
      } else {
        product.forEach(element => {
          element.classList.remove('moveFromBack');
        });
      }
    }
  },

  computed: {
    ...mapState('products', {
      products: state => state.products,
    }),
    ...mapState('categories', {
      categories: state => state.categories,
    }),
    ...mapState('cart', {
      uuid: state => state.uuid
    }),
  },

  created() {
    this.fetchAllProductsAction();
  },

  mounted() {
    // window.addEventListener('scroll', this.productsAnimation);
  },

  destroyed() {
    // window.removeEventListener('scroll', this.productsAnimation);
  }
}
</script>

<style lang="scss" scoped>
  .padding-section {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    text-align: center;
    padding: 3rem 0.5rem;
    margin-bottom: 1rem;
    
    .section-heading {
      margin-bottom: .5rem;

      h3 {
        width: 100%;
        text-align: center;
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1.2;
      }

      span {
        font-size: 14px;
        color: rgba(0, 0, 0,0.5);
        font-weight: 600;
      }
    }

    .products {
      margin: 0 auto;

      .product {
        display: inline-block;
        position: relative;
        width: 12.5rem;
        // height: 56vh;
        height: 21.8rem;
        margin: 0 0.5rem;
        margin-bottom: 3rem;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.6s;

        &:hover {
          box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
          transform: scale(1.02);
          // transition: all 0.1s;
        }

        .product-back {
          top: 0%;
          position: absolute;
          background-color: #a6bbda;
          height: 100%;
          width: 100%;
          opacity: 0;
          user-select: none;
          pointer-events: none;
          transform: rotateY(180deg);
          transition: opacity 0.5s;

          .product-back-content {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
              font-size: 1.5rem;
            }

            a {
              text-decoration: none;
            }
          }
        }

        .product-container {
          // background: linear-gradient(rgba(214, 229, 255, 0.5), rgba(218, 231, 255, 0.3));
          background: linear-gradient(rgba(192, 192, 192, 0.5), rgba(187, 187, 187, 0.3));
          height: 100%;
          width: 100%;

          .picture-section {
            height: 12.5rem;
            background: none;
            // background-color:#E5E7E9;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .info-section {
            padding: 0 0.5rem;

            .product-category {
              font-size: 12px;
              font-weight: 600;
              color: rgba(0, 0, 0,0.5);
              padding: 0.3rem;
              margin: auto;
            }

            .product-name {
              font-size: 14px;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .product-price {
              font-weight: 600;
              margin: auto;
              color: #1f6475;
            }
          }
        }
      }

      .rotate {
        perspective: 100rem !important;

        &:focus-within {
          transform: rotateY(180deg);

          .product-back {
            opacity: 1;
            top: 0%;
            user-select: auto;
            pointer-events: auto;
          }
        }
      }

      .moveFromBack {
        animation-name: moveFromBack;
        animation-duration: 2s;
      }
    }
  }

  // .moveFromBottom {
  //   animation-name: moveFromBottom;
  //   animation-duration: 1.5s;
  // }

  @keyframes moveFromBack {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  // @keyframes moveFromBottom {
  //   0% {
  //     transform: translateY(20px);
  //     opacity: 0;
  //   }

  //   100% {
  //     transform: translateY(0);
  //     opacity: 1;
  //   }
  // }

$color: rgb(0, 112, 139);
.button {
  display: inline-block;
  padding: .4rem 1.50rem;
  border-radius: 10rem;
  color: #000 !important;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color;
    border-radius: 10rem;
    z-index: -2;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background-color: darken($color, 15%);
    transition: all .3s;
    border-radius: 10rem;
    z-index: -1;
  }
  &:hover {
    color: #fff !important;
    &:before {
      height: 100%;
    }
  }
}
</style>