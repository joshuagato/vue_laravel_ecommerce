<template>
  <div class="view-products">
    <div class="col-md-12">
      <div class="row">
        <h2 class="border-bottom">Add Product</h2>
        <h5 class="text-center bg-success">  </h5>
      </div>
                    
      <form @submit.prevent="addNewProduct" enctype="multipart/form-data" class="my-3">
        <div class="row">
          <div class="col-md-8">
            <div class="form-group">
              <label for="product-title">Product Title </label>
              <input v-model="inputData.title" type="text" name="product_title" class="form-control" id="product-title">
            </div>              
              
            <div class="row">
              <div class="form-group col-md-6">
                <label for="product-price">Product Price</label>
                <input v-model="inputData.price" type="text" name="product_price" class="form-control"
                  size="60" id="product-price">
              </div>
              <div class="form-group col-md-6">
                <label for="product-quantity">Product Quantity</label>
                <input v-model="inputData.quantity" type="number" name="product_quantity" id="product-quantity" 
                  class="form-control" disabled>
              </div>
            </div>

            <div class="form-group">
              <label for="product-desc">Product Description</label>
              <textarea v-model="inputData.description" name="product_description" id="product-desc" 
                cols="30" rows="8" class="form-control"></textarea>
            </div>
          </div>
          
          <aside id="admin_sidebar" class="col-md-4">
            <div class="form-group">
              <label for="product-category">Product Category</label>
              <select v-model="inputData.category" name="product_category_id" id="product-category" 
                class="form-control">
                <option value="0">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="product-image">Product Image</label>
              <input id="product-image" type="file" @input="previewImage" accept="image/*" class="form-control">
              <button id="upload-button" type="button" @click="triggerUpload">Upload Image</button>
              <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src="imageData">
              </div>
            </div>

            <div class="form-group">
              <button type="submit" name="publish" class="form-control btn btn-secondary" :disabled="submitDisabled">ADD PRODUCT</button>
            </div>
          </aside>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      inputData: {
        title: '',
        category: 0,
        price: 0,
        image: '',
        description: ''
      },
      submitDisabled: true,
      imageData: "",  // we will store base64 format of image in this string,
    }
  },
  computed: {
    ...mapState('categories', {
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions({
      fetchAllCategoriesAction: 'categories/fetchAllCategories',
      addNewProductAction: 'products/addNewProduct'
    }),
    addNewProduct() {
      const formData = new FormData();
      formData.append('title', this.inputData.title);
      formData.append('category', this.inputData.category);
      formData.append('price', this.inputData.price);
      formData.append('image', this.inputData.image);
      formData.append('description', this.inputData.description);
      
      this.addNewProductAction(formData).then(response => {
        
        if (response) {
          swal("Product Added Successfully.", {
            icon: "success",
            buttons: false,
            timer: 1800,
          });

          this.inputData.title = '';
          this.inputData.category = 0;
          this.inputData.price = 0;
          this.inputData.image = '';
          this.inputData.description = '';
          this.submitDisabled = true;
          this.imageData = "";
        }
      })
      .catch(error => console.log(error));
    },
    previewImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData

          this.imageData = e.target.result;
          this.inputData.image = event.target.files[0];
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    triggerUpload(event) {
      event.target.previousElementSibling.click();
    }
  },
  created() {
    this.fetchAllCategoriesAction();
  },
  updated() {
    const input = this.inputData;
    if (input.title && input.category != 0 && input.price != 0 && input.image && input.description)
      this.submitDisabled = false;
    else this.submitDisabled = true;
  }
}
</script>

<style lang="scss" scoped>
  .view-products {
    padding: 1rem;
    animation-name: flipInX;
    animation-duration: 1s;
    font-family: 'Roboto', sans-serif;

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