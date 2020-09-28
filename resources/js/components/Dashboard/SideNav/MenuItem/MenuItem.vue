<template>
  <router-link :to="navto" class="menu-item">
    <span><FontAwesomeIcon :icon="faicon" /></span>
    <span class="title">{{ title }}</span>
  </router-link>
</template>

<script>
export default {
  props: ['faicon', 'title', 'navto']
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,700|Roboto:300,400,400i,500,700');

.menu-item {
  height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.8rem;
  text-decoration: none;
  color: #1f6475;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  &.router-link-exact-active {
    span {
      color: #1b1c1d;
    }
  }

  &:hover {
    background-color: #DADDE1;

    span {
      color: #444950;
    }
  }

  span {
    margin: 0 0.7rem;
    // color: #444950;
    // color: #1f6475;
    overflow: hidden;

    svg {
      // The svg width and height was overwritten by me
      // color: #FA383E;

      &.svg-inline--fa {
        width: 1.3rem;
        height: 1.3rem;
      }
    }
  }
}
</style>