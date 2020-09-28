<template>
  <section class="products-area">
    <CallToAction />
    <Hallmark />
    <Products />
    <Subscribe />
    <ViewedProducts />
    <Footer />
  </section>
</template>

<script>
import CallToAction from './CallToAction/CallToAction';
import Hallmark from './Hallmark/Hallmark';
import Products from './Products/Products';
import Subscribe from './Subscribe/Subscribe';
import ViewedProducts from './ViewedProducts/ViewedProducts';
import Footer from './Footer/Footer';

export default {
  components: {
    CallToAction,
    Hallmark,
    Products,
    Subscribe,
    ViewedProducts,
    Footer
  }
}
</script>

<style lang="scss" scoped>
  .products-area {
    background: none;
    // background-color: #eaf2ff;
    // background-color: rgba(232, 235, 240, 0.3);
    // background: linear-gradient(rgba(214, 229, 255, 0.5), rgba(218, 231, 255, 0.3));
    // padding: 1rem 2rem;
    
    // overflow-y: scroll;

    // // width
    // &::-webkit-scrollbar {
    //   width: 5px;
    // }

    // // track
    // &::-webkit-scrollbar-track {
    //   box-shadow: inset 0  0 5px grey;
    //   border-radius: 3px;
    // }

    // // handle
    // &::-webkit-scrollbar-thumb  {
    //   background: #606770;
    //   border-radius: 3px;
    // }
  }
  
</style>