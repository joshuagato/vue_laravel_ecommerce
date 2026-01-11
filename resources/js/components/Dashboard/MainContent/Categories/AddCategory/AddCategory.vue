<template>
    <div class="view-products">
        <p v-for="limb in limbs" :key="limb">MainContent - AddCategory</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            limbs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        };
    }
};
</script>

<style lang="scss" scoped>
.view-products {
    background-color: #f5f5f5;
    margin-bottom: 20rem;
    // border-right: 1px solid #DADDE1;
}
</style>
