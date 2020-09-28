<template>
  <div class="view-products">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mx-auto">
          <div class="mt-3 mb-5 col-lg-6 mx-auto text-center">
            <form action="">
              <select v-model="inputData.category" @change="fetchCategoryProducts" class="form-control">
                <option value="0">Please Select A Category</option>
                <option v-for="category in categories" :key="category" :value="category.id">{{ category.title }}</option>
              </select>
            </form>
          </div>
          <div class="row">
            <div class="col-md-8">
              <h5 class="text-muted">Products</h5>
            </div>
            <div class="col-md-1">
              <h6 class="text-muted">Edit</h6>
            </div>
            <div class="col-md-1">
              <h6 class="text-muted">Delete</h6>
            </div>
            <div class="col-md-2">
              <h6 class="text-muted">Price</h6>
            </div>
          </div>
          <hr>
          <div v-for="product in categoryproducts" :key="product.id" class="product">
            <div class="row">
              <div class="col-4 col-md-2 image-div">
                <!-- <router-link :to="`/products/${product.id}`"> -->
                  <img :src="'./images/' + product.image" :alt="product.title" class="img-fluid img-thumbnail" />
                <!-- </router-link> -->
              </div>
              <div class="col-5 col-md-6">
                <h5>
                  <!-- <router-link :to="'/products/' + product.id">{{ product.title }}</router-link> -->
                  <span class="col-blue">{{ product.title }}</span>
                  <p class="m-0">
                    <small class="col-gray">{{ fetchOneCategoryMethod(product.category) }}</small>
                  </p>
                </h5>
              </div>
              <div class="col-md-1">
                <form @submit.prevent="editProduct">
                  <input type="hidden" name="productid" :value="product.id">
                  <input type="hidden" name="productcat" :value="product.category">
                  <button type="submit" class="penbutton text-secondary" title="Edit Product">
                    <FontAwesomeIcon icon="pen" />
                    </button>
                </form>
              </div>
              <div class="col-md-1">
                <form @submit.prevent="deleteProduct">
                  <input type="hidden" name="productid" :value="product.id">
                  <button type="submit" class="penbutton text-danger" title="Delete Product">
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </form>
              </div>
              <div class="col-md-2">
                <h6 class="font-weight-bold text-danger">${{ product.price }}</h6>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      inputData: {
        category: 0
      }
    }
  },
  methods: {
    ...mapActions({
      fetchAllProductsAction: 'products/fetchAllProducts',
      fetchCategoryProductsAction: 'products/fetchCategoryProducts',
      fetchAllCategoriesAction: 'categories/fetchAllCategories',
      deleteProductAction: 'products/deleteProduct'
    }),
    fetchOneCategoryMethod(id) {
      const category = this.categories.find(element => element.id === parseInt(id));
      return category.title;
    },
    fetchCategoryProducts(event) {
      this.fetchCategoryProductsAction(this.inputData);
    },
    editProduct(event) {
      const prodId = event.target.children['productid'].value;
      const prodCat = event.target.children['productcat'].value;

      swal({
        title: "Are you sure?",
        text: "Do you really want to edit product?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.$router.replace({ path: 'dashboard?to=editproducts', query: { prodId, prodCat } });
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
    },
    deleteProduct(event) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, unless added again!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const productId = event.target.children['productid'].value;

          this.deleteProductAction(productId).then(response => {
            if (response) {
              swal("Product successfully deleted.", {
                icon: "success",
                buttons: false,
                timer: 1800,
              });
            }
          });
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
    }
  },
  computed: {
    ...mapState('products', {
      products: state => state.products,
      categoryproducts: state => state.categoryproducts
    }),
    ...mapState('categories', {
      categories: state => state.categories,
    })
  },
  watch: {
    products(currentState, previouState) {
      // if (currentState.length !== previouState.length) this.fetchAllProductsAction;
    }
  },
  created() {    
    this.fetchAllProductsAction();
    this.fetchAllCategoriesAction();
    this.fetchCategoryProductsAction(this.inputData);
  },
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto:300,400,400i,500,700');

  .view-products {
    padding: 1rem;
    font-family: 'Roboto', sans-serif;
    animation: slideInDown;
    animation-duration: 1s;
    cursor: default;

    .image-div {
      width: 4rem;
      height: 6rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .penbutton {
      background-color: transparent;
      outline: none;
      border: none;
    }
  }

  .col-blue {
    color: #1f6475;
  }

  .col-gray {
    // color: rgba(0, 0, 0, 0.5);
    // color: #6c757d;
    color: #a02d66;
    font-size: 14px;
  }
</style>