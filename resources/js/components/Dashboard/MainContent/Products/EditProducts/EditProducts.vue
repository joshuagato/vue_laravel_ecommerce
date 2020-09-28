<template>
  <div class="view-products">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-6 mx-auto">
          <form action="" method="post">
            <select v-model="inputData.category" @change="fetchCategoryProducts" 
              class="form-control my-3 animate-bouncein-down">
              <option value="0">Please Select a Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.title }}
              </option>
            </select>
            <select v-if="categoryDropdownTouched && categoryproducts.length > 0" v-model="inputData.selectedproductid" 
              @change="fetchOneProduct" class="form-control my-3 animate-zoomin">
              <option value="0">Please Select a Product to Edit</option>
              <option v-for="categoryproduct in categoryproducts" :key="categoryproduct.id" 
                :value="categoryproduct.id">{{ categoryproduct.title }}</option>
            </select>
          </form>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="categoryDropdownTouched && categoryproducts.length > 0 && productDropdownTouched" class="col-md-12 animate-slidein-up">
      <div class="row">
        <h2 class="border-bottom">Edit Product</h2>
        <h5 class="text-center bg-success">  </h5>
      </div>
                    
      <form @submit.prevent="updateProduct" enctype="multipart/form-data" class="my-3">
        <div class="row">
          <div class="col-md-8">
            <div class="form-group">
              <label for="product-title">Product Title </label>
              <input v-model="updateInputData.title" @input="updateInputHandler" type="text" name="product_title" 
                class="form-control" id="product-title">
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="product-price">Product Price</label>
                <input v-model="updateInputData.price" @input="updateInputHandler" type="text" name="product_price" 
                  class="form-control" size="60" id="product-price">
              </div>
              <div class="form-group col-md-6">
                <label for="product-quantity">Product Quantity</label>
                <input v-model="updateInputData.quantity" @input="updateInputHandler" type="number" 
                  name="product_quantity" id="product-quantity" class="form-control" disabled>
              </div>
            </div>
            <div class="form-group">
              <label for="product-desc">Product Description</label>
              <textarea v-model="updateInputData.description" @input="updateInputHandler" name="product_description" 
                id="product-desc" cols="30" rows="8" class="form-control"></textarea>
            </div>
          </div>

          <aside id="admin_sidebar" class="col-md-4">
            <div class="form-group">
              <label for="product-category">Product Category</label>
              <select v-model="updateInputData.category" @input="updateInputHandler" name="product_category_id"
                id="product-category" class="form-control">
                <option value="0">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="product-image">Product Image</label>
              <input id="product-image" type="file" @change="updateInputHandler" @input="previewImage"
                accept="image/*" class="form-control">
              <button id="upload-button" type="button" @click="triggerUpload">Upload Image</button>
              <div class="image-preview" v-if="imageData.length > 0 || updateInputData.image">
                <img class="preview" :src="imageData || './images/' + updateInputData.image">
              </div>
            </div>
            <div class="form-group">
              <button type="submit" name="publish" class="form-control btn btn-secondary" :disabled="submitDisabled">EDIT PRODUCT</button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      inputData: {
        category: 0,
        selectedproductid: 0
      },
      updateInputData: {
        title: '',
        category: '',
        price: 0,
        image: '',
        description: ''
      },
      categoryDropdownTouched: false,
      productDropdownTouched: false,
      submitDisabled: true,
      imageData: ''
    }
  },
  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    }),
    ...mapState('products', {
      categoryproducts: state => state.categoryproducts,
      product: state => state.product
    }),
    productState() {
      return this.product;
    }
  },
  methods: {
    ...mapActions({
      fetchCategoryProductsAction: 'products/fetchCategoryProducts',
      fetchOneProductAction: 'products/fetchOneProduct',
      fetchAllCategoriesAction: 'categories/fetchAllCategories',
      updateProductAction: 'products/updateProduct'
    }),
    fetchCategoryProducts(event) {
      this.fetchCategoryProductsAction(this.inputData);
      this.categoryDropdownTouched = true;
    },
    fetchOneProduct(event, prodId) {
      event.target ? this.fetchOneProductAction(event.target.value) : this.fetchOneProductAction(prodId);
      this.productDropdownTouched = true;
    },
    updateInputHandler(event) {
      if (this.checkForEquality(this.product, this.updateInputData)) this.submitDisabled = true;
      else this.submitDisabled = false;
    },
    previewImage(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
          this.updateInputData.image = event.target.files[0];
        }

        reader.readAsDataURL(input.files[0]);
      }
    },
    triggerUpload(event) {
      event.target.previousElementSibling.click();
    },
    updateProduct() {
      const formData = new FormData();
      formData.append('title', this.updateInputData.title);
      formData.append('category', this.updateInputData.category);
      formData.append('price', this.updateInputData.price);
      formData.append('image', this.updateInputData.image);
      formData.append('description', this.updateInputData.description);
      
      this.updateProductAction({ inputData: formData, productId: this.updateInputData.id }).then(response => {
        if (response) {
          swal("Product Edited Successfully.", {
            icon: "success",
            buttons: false,
            timer: 1800,
          });
        }
      })
      .catch(error => console.log(error));
    },
    checkForEquality(object1, object2) {
      const object1Keys = Object.keys(object1);
      const object2Keys = Object.keys(object2);

      // check for values
      for (let index = 0; index < object2Keys.length; index++) {
        let keyName = object2Keys[index];

        if (object1[keyName] != object2[keyName]) {
          return false;
        }
      }

      return true;
    },
  },

  watch: {
    productState(currentState, previouState) {
      this.updateInputData = Object.assign({}, this.updateInputData, currentState);
      
      if (this.checkForEquality(this.product, this.updateInputData)) this.submitDisabled = true;
    }
  },
  created() {
    const query = this.$route.query;

    if (query.prodId && query.prodCat) {

      const newInputData = {
        category: query.prodCat,
        selectedproductid: query.prodId
      }
      
      this.inputData = Object.assign({}, this.inputData, newInputData);
      this.fetchCategoryProducts(newInputData);
      this.fetchOneProduct(_, newInputData.selectedproductid);
    }

    this.fetchAllCategoriesAction();
    this.fetchCategoryProductsAction(this.inputData);
  },
  destroyed() {
    this.categoryDropdownTouched = false;
    this.productDropdownTouched = false;
  }
}
</script>

<style lang="scss" scoped>
  .view-products {
    padding: 1rem;
    font-family: 'Roboto', sans-serif;

    .animate-zoomin {
      animation: zoomIn;
      animation-duration: 1s;
    }

    .animate-bouncein-down {
      animation: bounceInDown;
      animation-duration: 1s;
    }

    .animate-slidein-up {
      animation: slideInUp;
      animation-duration: 1s;
    }

    form {
      textarea {
        resize: none;
      }

      #product-image {
        display: none;
      }

      #upload-button {
        background-color: transparent;
        border: 2px solid #1f6475;
        border-radius: 8px;
        color: #1f6475;
        font-weight: 600;
        width: 100%;
        height: 40px;
        outline: none;

        &:hover {
          animation-name: pulse;
          animation-duration: 1s;
        }
      }

      .image-preview {
        height: 12.3rem;

        img {
          height: 100%;
        }
      }
      
      button[type = 'submit'] {
        &:enabled {
          animation-name: shakeX;
          animation-duration: 2s;
        }

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
</style>