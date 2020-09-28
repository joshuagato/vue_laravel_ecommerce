<template>
  <div id="adminhomepage" class="">
    <section class="header-section">
      <Header :showhide="menuHandler" />
    </section>
    <section class="main-content-and-nav-div">
      <section v-if="shown" class="side-nav">
        <SideNav />
      </section>
      <section class="main-content">
          <ViewProducts v-if="this.$route.query.to === 'viewproducts'" />
          <EditProducts v-if="this.$route.query.to === 'editproducts'" />
          <AddProduct v-if="this.$route.query.to === 'addproduct'" />
          <ViewCategories v-if="this.$route.query.to === 'viewcategories'" />
          <EditCategories v-if="this.$route.query.to === 'editcategories'" />
          <AddCategory v-if="this.$route.query.to === 'addcatory'" />
      </section>
    </section>
  </div>
</template>

<script>
import ViewProducts from './/MainContent/Products/ViewProducts/ViewProducts';
import EditProducts from './MainContent/Products/EditProducts/EditProducts';
import AddProduct from './MainContent/Products/AddProduct/AddProduct';

import ViewCategories from './MainContent/Categories/ViewCategories/ViewCategories';
import EditCategories from './MainContent/Categories/EditCategories/EditCategories';
import AddCategory from './MainContent/Categories/AddCategory/AddCategory';

import Header from './Header/Header';
import SideNav from './SideNav/SideNav';

export default {
  data() {
    return {
      shown: true
    };
  },
  components: {
    Header, SideNav, ViewProducts, EditProducts, AddProduct, ViewCategories, EditCategories, AddCategory
  },
  methods: {
    menuHandler() {
      
    }
  },
  mounted() {
    this.$route.fullPath === '/dashboard' ? this.$router.replace('/dashboard?to=viewproducts') : '';
  },
  updated() {
    this.$route.fullPath === '/dashboard' ? this.$router.replace('/dashboard?to=viewproducts') : '';
  }
}
</script>

<style lang="scss" scoped>
#adminhomepage {
  // padding-top: 4rem;
  height: 100vh;
  width: 100%;

  .header-section {
    height: 11vh;
    width: 100%;
  }

  .main-content-and-nav-div {
    display: flex;
    height: 89vh;
    width: 100%;
    // width: 100vw;

    .side-nav {
      height: 100%;
      width: 24%;
      min-width: 250px;
    }

    .main-content {
      // overflow-wrap: break-word;
      // word-wrap: break-word;
      // overflow-y: hidden;
      
      height: 100%;  // Redundant code. Find out why
      // min-width: 81.5%;
      width: 86%;
      background-color: #f5f5f5;
      // background-color: #dadada;

      overflow-y: scroll;
      // width
      &::-webkit-scrollbar {
        width: 5px;
      }

      // track
      &::-webkit-scrollbar-track {
        box-shadow: inset 0  0 5px grey;
        border-radius: 3px;
      }

      // handle
      &::-webkit-scrollbar-thumb  {
        background: #606770;
        border-radius: 3px;
      }
    }
  }
}
</style>