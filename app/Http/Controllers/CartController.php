<?php

namespace App\Http\Controllers;

use App\Cart;
use App\CartItem;
use App\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
  // Controller function for fetching the shopping cart
  public function fetchCart(Request $request)
  {
    $storedCart = Cart::where('cart_uuid', $request->uuid)->first();
    $storedCartItems = CartItem::where(['cart' => $storedCart->id, 'cart_uuid' => $request->uuid])->get();
    return ['cart' => $storedCart, 'cartitems' => $storedCartItems];
  }

  // Controller function for creating a shopping cart
  public function createCart(Request $request)
  {
    $storedCart = Cart::where('cart_uuid', $request->uuid)->first();

    if ($storedCart) return ['result' => 'Cart exists already.', 'success' => false];

    $newCart = new Cart;
    $newCart->cart_uuid = $request->uuid;
    $newCart->total_qty = 0;
    $newCart->total_price = 0;
    $newCart->save();
    return ['result' => 'Cart successfully created.', 'success' => true];
  }

  // Controller function for adding an item to cart
  public function addToCart(Request $request)
  {
    $product = Product::find($request->productId);
    $storedCart = Cart::where('cart_uuid', $request->uuid)->first();
    $storedCartItem = CartItem::where(['cart_uuid' => $request->uuid, 'product' => $product->id])->first();

    if ($storedCartItem) {
      $storedCartItem->qty += 1;
      $storedCartItem->sub_total = $storedCartItem->unit_price * $storedCartItem->qty;

      $storedCart->total_price += $storedCartItem->unit_price;
      $storedCart->save();
      $storedCartItem->save();
      return ['success' => true, 'result' => "Cart item's quantity increased by 1."];
    }

    $newCartItem = new CartItem;
    $newCartItem->cart = $storedCart->id;
    $newCartItem->cart_uuid = $request->uuid;
    $newCartItem->product = $product->id;
    $newCartItem->qty = 1;
    $newCartItem->unit_price = $product->price;
    $newCartItem->sub_total = $newCartItem->unit_price * $newCartItem->qty;

    $storedCart->total_qty += 1;
    $storedCart->total_price += $newCartItem->unit_price;

    $storedCart->save();
    $newCartItem->save();
    return ['success' => true, 'result' => 'New item added to cart.'];
  }

  // Controller function for removing an item from cart
  public function removeFromCart(Request $request)
  {
    $cartItem = CartItem::where(['id' => $request->item_id, 'cart' => $request->cart_id])->first();
    $cart = Cart::where(['id' => $cartItem->cart, 'cart_uuid' => $cartItem->cart_uuid])->first();

    $cart->total_qty -= 1;
    $cart->total_price -= $cartItem->sub_total;

    $cartItem->delete(); // the delete method invokes the save method implicitly, so // $cartItem->save(); is redundant and a nuisance
    $cart->save();
    return ['success' => true];
  }

  // Controller function for increasing cart item quantity
  public function increaseItemQuantity(Request $request)
  {
    $cartItem = CartItem::where(['id' => $request->item_id, 'cart' => $request->cart_id])->first();
    $cart = Cart::where(['id' => $cartItem->cart, 'cart_uuid' => $cartItem->cart_uuid])->first();

    $cartItem->qty += 1;
    $cartItem->sub_total = $cartItem->unit_price * $cartItem->qty;
    $cart->total_price += $cartItem->unit_price;

    $cartItem->save();
    $cart->save();
    return ['success' => true];
  }

  // Controller function for decreasing cart item quantity
  public function decreaseItemQuantity(Request $request)
  {
    $cartItem = CartItem::where(['id' => $request->item_id, 'cart' => $request->cart_id])->first();
    $cart = Cart::where(['id' => $cartItem->cart, 'cart_uuid' => $cartItem->cart_uuid])->first();

    if ($cartItem->qty == 1) {
      $this->removeFromCart(app(Request::class)); // invoking a controller method with Request args
      return ['success' => true];
    }

    $cartItem->qty -= 1;
    $cartItem->sub_total = $cartItem->unit_price * $cartItem->qty;
    $cart->total_price -= $cartItem->unit_price;
    
    $cartItem->save();
    $cart->save();
    return ['success' => true];
  }
}
