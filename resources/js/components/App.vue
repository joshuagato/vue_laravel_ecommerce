<template>
  <div id="main">
    <Navbar />
    <div class="content">
      <span ref="scrollbutton" @click="scrollToTop" id="scrollbutton" title="Back To Top">
        <FontAwesomeIcon icon="long-arrow-alt-up" size="2x" />
      </span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './Partitions/Navbar/Navbar';
import { mapActions, mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      
    }
  },

  components: { Navbar },
  methods: {
    ...mapActions({
      createCartAction: 'cart/createCart',
      fetchCartAction: 'cart/fetchCart',
      fetchAllCategoriesAction: 'categories/fetchAllCategories',
    }),
    scrollToTop() {
      window.scroll({ top: 0, behavior: 'smooth' });
    },
    toggleScrollButton() {      
      const scrollBtn = this.$refs.scrollbutton;
      // scrollBtn.classList.toggle('show', window.scrollY > 300);
      if (window.scrollY > 300) {
        scrollBtn.classList.remove('hide');
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
        scrollBtn.classList.add('hide');
      }
    }
  },

  mounted() {    
    window.addEventListener('scroll', this.toggleScrollButton);
    this.fetchAllCategoriesAction();

    const inputData = {
      uuid: localStorage.getItem('uuid') || ''
    }

    if (!localStorage.getItem('uuid')) {
      // inputData['uuid'] = uuidv4();
      inputData.uuid = uuidv4();
      this.createCartAction(inputData);
    }
    
    // this.fetchCartAction(inputData); this line is not neccessary due to the dispatch in vuex
  },
  
  destroyed() {
    window.removeEventListener('scroll', this.toggleScrollButton);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto:300,400,400i,500,700');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  // overflow: hidden;
}

#main {
  height: 100vh;

  // overflow-y: auto;

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

@keyframes moveFromBottom {
  from { transform: translateY(90px); };
  to { transform: translateY(0); };
}

@keyframes moveFromTop {
  from { transform: translateY(0); };
  to { transform: translateY(90px); };
}

$color: rgb(31, 143, 255);
#scrollbutton {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(31, 143, 255);
  width: 60px;
  height: 60px;
  text-align: center;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color .8s, opacity 1s, visibility 1s;
  color: #fff;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;

  &.show {
    opacity: 1;
    visibility: visible;
    animation-name: moveFromBottom;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    animation-name: moveFromTop;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  &:hover {
    cursor: pointer;
    background-color: darken($color, 25%);
  }
}
</style>