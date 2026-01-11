<template>
    <div class="cart-wrap">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="main-heading">Shopping Cart</div>
                    <div class="table-cart">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="cartitem in cartitems"
                                    :key="cartitem.id"
                                >
                                    <td>
                                        <div class="display-flex align-center">
                                            <div class="img-product">
                                                <img
                                                    :src="
                                                        './images/' +
                                                            fetchProductImage(
                                                                cartitem.product
                                                            )
                                                    "
                                                    :alt="
                                                        fetchProductName(
                                                            cartitem.product
                                                        )
                                                    "
                                                    class="mCS_img_loaded"
                                                />
                                            </div>
                                            <div class="name-product">
                                                {{
                                                    fetchProductName(
                                                        cartitem.product
                                                    )
                                                }}
                                                <!-- <br>G2356 -->
                                            </div>
                                            <div class="price">
                                                ${{ cartitem.unit_price }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="product-count">
                                        <form
                                            action="#"
                                            class="count-inlineflex"
                                        >
                                            <div
                                                @click="
                                                    decreaseItemQuantity(
                                                        cartitem.id,
                                                        cartitem.cart
                                                    )
                                                "
                                                class="qtyminus"
                                            >
                                                -
                                            </div>
                                            <input
                                                type="text"
                                                name="quantity"
                                                :value="cartitem.qty"
                                                class="qty"
                                                readonly
                                            />
                                            <div
                                                @click="
                                                    increaseItemQuantity(
                                                        cartitem.id,
                                                        cartitem.cart
                                                    )
                                                "
                                                class="qtyplus"
                                            >
                                                +
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                        <div class="total">
                                            ${{ cartitem.sub_total }}
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            href="#"
                                            title="Delete"
                                            @click.prevent="
                                                deleteCartItem(
                                                    cartitem.id,
                                                    cartitem.cart
                                                )
                                            "
                                        >
                                            <FontAwesomeIcon icon="trash" />
                                            <!-- <img src="images/icons/delete.png" alt="" class="mCS_img_loaded"> -->
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.table-cart -->
                </div>
                <!-- /.col-lg-8 -->
                <div class="col-lg-4 cart-totals-div">
                    <div class="cart-totals">
                        <h3>Cart Totals</h3>
                        <form action="#" method="get" accept-charset="utf-8">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Total Price</td>
                                        <td class="subtotal">
                                            ${{ cart ? cart.total_price : "" }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td class="free-shipping">
                                            Free Shipping
                                        </td>
                                    </tr>
                                    <tr class="total-row">
                                        <td>Grand Total</td>
                                        <td class="price-total">
                                            ${{ cart.total_price }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn-cart-totals">
                                <router-link
                                    to="/"
                                    class="update round-black-btn"
                                    title=""
                                    >Continue Shopping</router-link
                                >
                                <a
                                    href="#"
                                    class="checkout round-black-btn"
                                    title=""
                                    >Proceed to Checkout</a
                                >
                            </div>
                            <!-- /.btn-cart-totals -->
                        </form>
                        <!-- /form -->
                    </div>
                    <!-- /.cart-totals -->
                </div>
                <!-- /.col-lg-4 -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import swal from "sweetalert";

export default {
    data() {
        return {
            items: [1, 2, 3]
        };
    },

    computed: {
        ...mapState("cart", {
            cart: state => state.cart,
            cartitems: state => state.cartitems
        }),
        ...mapState("products", {
            products: state => state.products
        })
    },

    methods: {
        ...mapActions({
            removeFromCartAction: "cart/removeFromCart",
            increaseItemQuantityAction: "cart/increaseItemQuantity",
            decreaseItemQuantityAction: "cart/decreaseItemQuantity"
        }),
        fetchProductName(id) {
            const product = this.products.find(
                product => product.id === parseInt(id)
            );
            return product.title;
        },
        fetchProductImage(id) {
            const product = this.products.find(
                product => product.id === parseInt(id)
            );
            return product.image;
        },
        deleteCartItem(item_id, cart_id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, unless added to cart again!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    const inputData = {
                        item_id: item_id,
                        cart_id: cart_id
                    };

                    this.removeFromCartAction(inputData).then(response => {
                        if (response) {
                            swal("Item successfully deleted from cart!", {
                                icon: "success",
                                buttons: false,
                                timer: 1800
                            });
                        }
                    });
                } else {
                    // swal("Your imaginary file is safe!");
                }
            });
        },
        increaseItemQuantity(item_id, cart_id) {
            const inputData = {
                item_id: item_id,
                cart_id: cart_id
            };
            this.increaseItemQuantityAction(inputData);
        },
        decreaseItemQuantity(item_id, cart_id) {
            const inputData = {
                item_id: item_id,
                cart_id: cart_id
            };
            this.decreaseItemQuantityAction(inputData);
        }
    }
};
</script>

<style lang="scss" scoped>
// .main {
//   padding-top: 5rem;
// }

@keyframes moveFromRight {
    0% {
        opacity: 0;
        transform: translateX(100px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes moveFromBack {
    from {
        opacity: 0.5;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.cart-totals-div {
    opacity: 0;
    animation-name: moveFromRight;
    animation-duration: 2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
}

.cart-wrap {
    min-height: 100vh;
    background: linear-gradient(
        rgba(214, 229, 255, 0.5),
        rgba(218, 231, 255, 0.3)
    );
    padding: 80px 0;
    font-family: "Open Sans", sans-serif;
    animation: 0.3s forwards moveFromBack;
    animation-fill-mode: forwards;
}
.main-heading {
    font-size: 19px;
    margin-bottom: 20px;
}
.table-cart table {
    width: 100%;
}
.table-cart thead {
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 5px;
}
.table-cart thead tr th {
    padding: 8px 0 18px;
    color: #484848;
    font-size: 15px;
    font-weight: 400;
}

// .table-cart tbody tr {
//   height: 100%;
//   display: flex;
//   align-items: center;
// }

// .table-cart tbody tr td {
//   height: 100%;
//   display: flex;
//   align-items: center;
// }

.table-cart tr td {
    padding: 40px 0 27px;
    vertical-align: middle;
}
.table-cart tr td:nth-child(1) {
    width: 52%;
}
.table-cart tr td:nth-child(2) {
    width: 26%;
}
.table-cart tr td:nth-child(3) {
    width: 13.333%;
}
.table-cart tr td:nth-child(4) {
    width: 8.667%;
    text-align: right;
}
.table-cart tr td .img-product {
    width: 72px;
    float: left;
    margin-left: 8px;
    margin-right: 31px;
    line-height: 63px;
}
.table-cart tr td .img-product img {
    width: 100%;
}
.table-cart tr td .name-product {
    font-size: 15px;
    color: #484848;
    padding-top: 8px;
    line-height: 24px;
    width: 50%;
}
.table-cart tr td .price {
    text-align: right;
    line-height: 64px;
    margin-right: 40px;
    color: #989898;
    font-size: 16px;
    font-family: "Nunito";
}
.table-cart tr td .quanlity {
    position: relative;
}
.product-count .qtyminus,
.product-count .qtyplus {
    width: 34px;
    height: 34px;
    background: transparent;
    text-align: center;
    font-size: 19px;
    line-height: 34px;
    color: #000;
    cursor: pointer;
    font-weight: 600;
}
.product-count .qtyminus {
    line-height: 32px;
}
.product-count .qtyminus {
    border-radius: 3px 0 0 3px;
}
.product-count .qtyplus {
    border-radius: 0 3px 3px 0;
}
.product-count .qty {
    width: 60px;
    text-align: center;
    border: none;
}
.count-inlineflex {
    display: inline-flex;
    border: solid 2px #ccc;
    border-radius: 20px;
}
.total {
    font-size: 24px;
    font-weight: 600;
    color: #8660e9;
}
.display-flex {
    display: flex;
}
.align-center {
    align-items: center;
}

input:focus {
    outline: none;
    box-shadow: none;
}
.round-black-btn {
    border-radius: 25px;
    padding: 8px 35px;
    display: inline-block;
    background: transparent;
    border: solid 2px #212529;
    color: #212529;
    transition: all 0.5s ease-in-out 0s;
    cursor: pointer;
}
.round-black-btn:hover,
.round-black-btn:focus {
    background: #212529;
    color: #fff;
    text-decoration: none;
}
.cart-totals {
    border-radius: 1rem;
    // background: #e7e7e7;
    background-color: rgba(35, 83, 172, 0.3);
    padding: 25px;
}
.cart-totals h3 {
    font-size: 19px;
    color: #3c3c3c;
    letter-spacing: 1px;
    font-weight: 500;
}
.cart-totals table {
    width: 100%;
}
.cart-totals table tr th,
.cart-totals table tr td {
    width: 50%;
    padding: 3px 0;
    vertical-align: middle;
}
.cart-totals table tr td:last-child {
    text-align: right;
}
.cart-totals table tr td.subtotal {
    font-size: 20px;
    color: #6f6f6f;
}
.cart-totals table tr td.free-shipping {
    font-size: 14px;
    color: #6f6f6f;
}
.cart-totals table tr.total-row td {
    padding-top: 25px;
}
.cart-totals table tr td.price-total {
    font-size: 24px;
    font-weight: 600;
    // color: #8660e9;
    color: #2fa360;
}
.btn-cart-totals {
    text-align: center;
    margin-top: 60px;
    margin-bottom: 20px;
}
.btn-cart-totals .round-black-btn {
    margin: 10px 0;
}
</style>
