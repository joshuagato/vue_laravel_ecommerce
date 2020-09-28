<template>
  <div ref="hallmark" id="hallmark" class="container py-5">
    <div class="row">
      <div class="col-12">
        <section class="section-heading">
          <h3>Our Hallmark</h3>
          <span>These and many more set us apart.</span>
        </section>
      </div>
      <div class="features text-center my-4 my-md-0 col-md-4">
        <div class="item">
          <div class="photo">
            <FontAwesomeIcon icon="shopping-cart" size="2x" />
          </div>
          <h3>Quality Products</h3>
          <p>Ex vix alienum sadipscing, quod melius philosophia id has. Ad qui quem reprimique, quo possit detracto reprimique no.</p>
        </div>
      </div>
      <div class="features text-center my-4 my-md-0 col-md-4">
        <div class="item">
          <div class="photo">
            <FontAwesomeIcon icon="anchor" size="2x" />
          </div>
          <h3>Free Shipping</h3>
          <p>Ex vix alienum sadipscing, quod melius philosophia id has. Ad qui quem reprimique, quo possit detracto reprimique no.</p>
        </div>
      </div>
      <div class="features text-center my-4 my-md-0 col-md-4">
        <div class="item">
          <div class="photo">
            <FontAwesomeIcon icon="cubes" size="2x" />
          </div>
          <h3>Easy Returns</h3>
          <p>Ex vix alienum sadipscing, quod melius philosophia id has. Ad qui quem reprimique, quo possit detracto reprimique no.</p>
        </div>
      </div>    
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  
  methods: {
    hallmarkAnimation() {
      const hallmark = this.$refs.hallmark;
      const hallmarkPositionFromTop = hallmark.offsetTop;
      const hallmarkHeight = hallmark.offsetHeight;
      const features = this.$el.querySelectorAll('.features');
      
      const pageYOffset = window.pageYOffset;
      const scrollTopValue = window.scrollY;

      if (pageYOffset > (hallmarkPositionFromTop - hallmarkHeight * 108/100) || scrollTopValue > (hallmarkPositionFromTop - hallmarkHeight * 108/100)) {
        features.forEach(element => {
          element.classList.add('moveFromBottom');
        });
      } else {
        features.forEach(element => {
          element.classList.remove('moveFromBottom');
        });
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.hallmarkAnimation);
  },

  destroyed() {
    window.removeEventListener('scroll', this.hallmarkAnimation);
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto:300,400,400i,500,700');
  
  #hallmark {
    display: block;
    font-family: 'Roboto', sans-serif;
    cursor: default;
    margin: auto;
    margin-top: 5rem;
    -webkit-text-stroke: rgba(255, 255, 255, 0.01) 0.1px;
    -webkit-font-smoothing: antialiased !important;

    .section-heading {
      text-align: center;
      margin-bottom: .5rem;

      h3 {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1.2;
      }

      span {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 600;
      }
    }

    .features {
      // visibility: hidden;
      opacity: 0;

      .item {
        color:#333;

        .photo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem auto;
          width: 5rem;
          height: 5rem;
          padding: 1rem;
          border-radius: 50%;
          background-color: #1f6475;

          svg {
            color:#fff;
          }
        }

        h3 {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.1;
        }

        p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
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
</style>