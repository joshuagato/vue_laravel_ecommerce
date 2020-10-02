<template>
  <section id="viewed-products" ref="viewed-products">
    <section class="section-heading pb-5">
      <h3>Viewed Products</h3>
      <span v-if="viewedproducts && (viewedproducts.length > 0)">
        You've viewed these products recently.
      </span>
      <span v-if="!viewedproducts">
        You've not yet viewed any product.
      </span>
    </section>
    <template>
      <section class="carousel-section" v-if="viewedproducts && viewedproducts.length > 0">
        <carousel v-bind="settings">
          <div ref="viewed" tabindex="0" class="viewed activeviewed" v-for="prod in viewedproducts" :key="prod.id" >
            <div class="img-container">
              <img :src="`${imageUrl}${getAttribute(prod.product, 'image')}`" alt="img-url">
            </div>
            <div class="details-container">
              <p class="product-category text-center mb-1">
                <span class="pl-1">{{ fetchOneCategoryMethod(getAttribute(prod.product, 'category')) }}</span>
              </p>
              <h6 class="product-name text-center">{{ getAttribute(prod.product, 'title') }}</h6>
              <p class="product-price text-center">${{ getAttribute(prod.product, 'price') }}</p>
              <button type="button">Add To Cart</button>
            </div>
          </div>
        </carousel>
      </section>
      <section v-if="!viewedproducts">
        <div ref="viewed" tabindex="0" class="viewed">
          <br class="line-break">
        </div>
      </section>
    </template>
  </section>
</template>

<script>
import carousel from 'vue-owl-carousel';
import { mapState } from 'vuex';

export default {
  components: {
    carousel
  },
  data() {
    return {
      // imageUrl: 'http://127.0.0.1:8000/images/',
      imageUrl: 'https://joshgato-amazoned.herokuapp.com/images/',
      settings: {
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        "responsive": {0:{items:1,nav:false}, 600 :{items:3,nav:true}, 1000 :{items:6,nav:true}}
      }
    };
  },
  computed: {
    ...mapState('viewedproducts', {
      viewedproducts: state => state.viewedproducts
    }),
    ...mapState('products', {
      products: state => state.products,
    }),
    ...mapState('categories', {
      categories: state => state.categories,
    })
  },
  methods: {
    viewedProductsAnimation() {
      const viewedSection = this.$refs['viewed-products'];
      const viewedSectionPositionFromTop = viewedSection.offsetTop;
      const viewedSectionHeight = viewedSection.offsetHeight;
      // const viewed = this.$refs.viewed;
      const viewed = document.querySelectorAll('.viewed');

      const pageYOffset = window.pageYOffset;
      const scrollTopValue = window.scrollY;

      if (pageYOffset > (viewedSectionPositionFromTop - viewedSectionHeight * 99/100) ||
        scrollTopValue > (viewedSectionPositionFromTop - viewedSectionHeight * 99/100)) {
        viewed.forEach(element => {
          element.classList.add('moveFromBottom');
        });
      } else {
        viewed.forEach(element => {
          element.classList.remove('moveFromBottom');
        });
      }
    },
    getAttribute(productId, attributeName) {
      const product = this.products.find(element => element.id === parseInt(productId));
      return product[attributeName];
    },
    fetchOneCategoryMethod(id) {
      const category = this.categories.find(element => element.id === parseInt(id));
      return category.title;
    }
  },

  mounted() {
    window.addEventListener('scroll', this.viewedProductsAnimation);
  },

  destroyed() {
    window.removeEventListener('scroll', this.viewedProductsAnimation);
  }
}
</script>

<style lang="scss" scoped>
$color: rgb(0, 112, 139);

.animate__backInUp {
  animation: backInUp;
  animation-duration: 2s;
}

.moveFromBottom {
  animation-name: moveFromBottom;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  // opacity: 1;
}

@keyframes moveFromBottom {
  from { opacity: 0; transform: translateY(90px); };
  to { opacity: 1; transform: translateY(0); };
}

#viewed-products {
  width: 100%;
  padding: 3rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;

  .carousel-section {
    
  }

  #carousel_mitaxbkq1hq {
        
    .owl-stage-outer {
      width: 99%;
      margin: 0 auto;
      text-align: center;

      .owl-stage {

        .owl-item {
          // display: flex !important;
          // flex-direction: column;
          // align-items: center !important;
          // justify-content: center !important;
        }
      }
    }
  }

  .section-heading {
    margin-bottom: 0.5rem;

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

  .activeviewed {
    height: 18rem;
    width: 11rem !important;
    margin: 0.5rem auto;

    &:hover {
      // border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
      transform: translateY(-5px) !important;
      transition: all 0.6s ease !important;

      .details-container {
        button {
          opacity: 1;
        }
      }
    }

    .img-container {
      width: 100%;
      height: 11rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .details-container {
      padding: 0 0.5rem;

      .product-category {
        font-size: 12px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
        padding: 0 0.3rem;
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

      button {
        border: none;
        outline: none;
        width: 90%;
        color: #000;
        background-color: $color;
        opacity: 0;

        &:hover {
          color: #fff;
          background-color: darken($color, 15%);
        }
      }
    }
  }

  .line-break {
    margin: 2rem 0;
  }
}
</style>