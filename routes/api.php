<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Endpoints for the authentication controller
Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function() {
    Route::post('signup', 'SignUpController');
    Route::post('signin', 'SignInController');
    Route::post('signout', 'SignOutController');
    Route::get('me', 'MeController');
});

// Endpoints for the category controller
Route::group(['prefix' => 'cat'], function() {
    Route::post('store', 'CategoryController@store');
    Route::get('fetchall', 'CategoryController@index');
    Route::get('fetchone/{id}', 'CategoryController@show');
});

// Endpoints for the product controller
Route::group(['prefix' => 'prod'], function() {
    Route::get('fetchall', 'ProductController@index');
    Route::post('store', 'ProductController@store');
    Route::post('fetchcatprod', 'ProductController@getProductsFromCategory');
    Route::get('fetchone/{id}', 'ProductController@show');
    Route::post('updateone/{id}', 'ProductController@update');
    Route::post('deleteone/{id}', 'ProductController@destroy');
});

// Endpoints for the cart controller
Route::group(['prefix' => 'cart'], function() {
    Route::post('fetchcart', 'CartController@fetchCart');
    Route::post('createcart', 'CartController@createCart');
    Route::post('addtocart', 'CartController@addToCart');
    Route::post('removefromcart', 'CartController@removeFromCart');
    Route::post('increaseitemquantity', 'CartController@increaseItemQuantity');
    Route::post('decreaseitemquantity', 'CartController@decreaseItemQuantity');
});