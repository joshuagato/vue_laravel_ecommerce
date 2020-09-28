<template>
  <aside ref="side-nav-div" class="side-nav-div moveFromLeft">
    <MenuItem navto='/dashboard?to=viewproducts' :faicon="tv" :title="'View Products'" />
    <MenuItem navto='/dashboard?to=editproducts' :faicon="edit" :title="'Edit Products'" />
    <MenuItem navto='/dashboard?to=addproduct' :faicon="add" :title="'Add Product'" />
    <hr>
    <MenuItem navto='/dashboard?to=viewcategories' :faicon="tv" :title="'View Categories'" />
    <MenuItem navto='/dashboard?to=editcategories' :faicon="edit" :title="'Edit Categories'" />
    <MenuItem navto='/dashboard?to=addcatory' :faicon="add" :title="'Add Category'" />
    <hr>
    <MenuItem navto='/dashboard' :faicon="orders" :title="'View Orders'" />
    <MenuItem navto='/dashboard' :faicon="manage" :title="'Manage Orders'" />
    <hr>
    <MenuItem navto='/dashboard' :faicon="purchases" :title="'Purchases'" />
    <MenuItem navto='/dashboard' :faicon="manage" :title="'Manage Purchases'" />
    <hr>
    <MenuItem navto='/dashboard' :faicon="users" :title="'View Users'" />
    <MenuItem navto='/dashboard' :faicon="manage" :title="'Manage Users'" />
  </aside>
</template>

<script>
import MenuItem from "./MenuItem/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faTv, faEdit, faDatabase, faTasks, faUser, faUserAlt, faList, 
  faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    MenuItem, FontAwesomeIcon
  },
  data() {
    return {
      myIcon: faSpinner,
      tv: faTv,
      edit: faEdit,
      add: faDatabase,
      manage: faTasks,
      users: faUserAlt,
      orders: faList,
      purchases: faShoppingCart,
    };
  },
  methods: {
    addScrollEffect() {
      // console.log('This is', window.scrollY);
    }
  },
  mounted() {
    // console.log(this.$el.children[0])
    // console.log(this.$el.children)
    // const vm = this;

    // window.addEventListener("load", function(event) {
    //   const sideNavDiv = vm.$el['side-nav-div'];
      
    //   sideNavDiv.addEventListener('scroll', vm.addScrollEffect);
    //   vm.addScrollEffect();
    // });
  }
}
</script>

<style lang="scss" scoped>

@keyframes moveFromLeft {
  from { opacity: 0; transform: translateX(-120px); };
  to { opacity: 1; transform: translateX(0); visibility: visible; };
}

.moveFromLeft {
  animation-name: moveFromLeft;
  // animation-direction: alternate-reverse;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  visibility: hidden;
}

.side-nav-div {
  padding-top: 0.8rem;
  height: 100%;
  width: 100%;
  // overflow-y: hidden;
  overflow-y: scroll;
  background-color: #f5f5f5;
  // border-right: 1px solid #DADDE1;

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
</style>