<template>
  <div class="header-div moveFromTop">
    <div class="menu-icon-group">
      <div @click="showhide" title="Double click to show/hide sidebar" class="menu">
        <FontAwesomeIcon icon="bars" />
      </div>
      <div @lick="homeHandler" class="brand">
        <!-- <FontAwesomeIcon :icon="['fab', 'youtube']" /> -->
        <span>Admin Dashboard</span>
      </div>
    </div>
    <div class="search-bar">
      <input type="search" placeholder="Search" />
      <button type="button"><FontAwesomeIcon icon="search" /></button>
    </div>
    <div class="other-options">
      <!-- <span class="upload-video" title="Upload Video"><FontAwesomeIcon icon="faUpload" /></span> -->
      <router-link to="/" active-class="active">
        <span class="sign-in" title="Back to Home"><FontAwesomeIcon icon="home" /></span>
      </router-link>
      <span class="sign-up" title="Singout Here"><FontAwesomeIcon icon="sign-out-alt" /></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showhide'],
  methods: {
    homeHandler() {
      // this.props.history.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto:300,400,400i,500,700');

@keyframes moveFromTop {
  from { opacity: 0; transform: translateY(-70px); };
  to { opacity: 1; transform: translateX(0); visibility: visible; };
}

.moveFromTop {
  animation-name: moveFromTop;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  visibility: hidden;
}

.header-div {
  // position: fixed;
  z-index: 10;  // Redundant code. Find out why
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // height: 3.5rem;
  height: 100%;
  background-color: #F5F6F7;
  border-bottom: 1px solid #DADDE1;
  box-sizing: border-box;
  color: #1f6475;

  .menu-icon-group {
    display: flex;
    align-items: center;

    .menu {
      display: flex;
      align-items: center;

      margin: 0 1.5rem;
      cursor: pointer;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    .brand {  
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: bolder;
      font-size: 20px;
      font-family: 'Roboto', sans-serif;

      // svg {
      //   width: 1.5rem;
      //   height: 1.5rem;
      // }
    }
  }

  .search-bar {
    display: flex;
    align-items: center;

    input[type="search"] {
      // width: 10rem;
      width: 25rem;
      height: 2.2rem;
      padding: 0 0.5rem;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid #BEC3C9;
      outline: none;
    }

    button {
      height: 2.2rem;
      width: 4.4rem;
      background-color: #fff;
      color: #8D949E;
      border: 1px solid #BEC3C9;
      cursor: pointer;
      outline: none;
    }
  }

  .other-options {
    margin-right: 2rem;
    
    display: flex;
    align-items: center;

    span {
      margin: 0 1rem;
      cursor: pointer;

      svg {
        width: 1.3rem;
        height: 1.3rem;
      }
    }
  }
}
</style>