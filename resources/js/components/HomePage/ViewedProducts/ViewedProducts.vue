<template>
  <section id="viewed-products" ref="viewed-products">
    <section class="section-heading pb-5">
      <h3>Viewed Products</h3>
      <span>You've viewed these products recently.</span>
    </section>

    <section class="carousel-section">
      <carousel v-bind="settings">
      
      <div ref="viewed" v-for="product in products" :key="product" tabindex="0" class="viewed" >
        <div class="img-container">
          <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="img-url">
        </div>
        <div class="details-container">
          <p class="product-category text-center mb-1">
            <span class="pl-1">Home Garden & Living</span>
          </p>
          <h6 class="product-name text-center">Gramercy Mid-Century Modern Dining Chair</h6>
          <p class="product-price text-center">$159</p>
          <button type="button">Add To Cart</button>
        </div>
      </div>
      
    </carousel>
    </section>
  </section>
</template>

<script>
  import carousel from 'vue-owl-carousel'

export default {
  components: {
    carousel
  },
  data() {
    return {
      products: [1,2,3,4,5,6,7,8,9,10],
      // products: [1,2],
      // products: [{id: 1, title: 'first'},{id: 2, title: 'second'},{id: 3, title: 'thied'}],
      settings: {
        autoplay: true,
        autoplayHoverPause: true,
        nav: false,
        "responsive": {0:{items:1,nav:false}, 600 :{items:3,nav:true}, 1000 :{items:6,nav:true}}
      }
    };
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

    .viewed {
      height: 18rem;
      width: 11rem !important;
      margin: 0.5rem auto;

      &:hover {
        // border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
        transform: scale(1.02);
        transition: all 0.1s;

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

    
   
  }
</style>