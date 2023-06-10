<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
  return view('welcome');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/clear-cache', function () {
  $exitCode = Artisan::call('config:cache');
  return 'DONE'; //Return anything
});

Route::get('/clear-everything', function () {
  $clearcache = Artisan::call('cache:clear');
  echo "Cache cleared<br>";

  $clearview = Artisan::call('view:clear');
  echo "View cleared<br>";

  $clearconfig = Artisan::call('config:cache');
  echo "Config cleared<br>";

  // $cleardebugbar = Artisan::call('debugbar:clear');
  // echo "Debug Bar cleared<br>";
});

Route::get('/{vue_capture?}', function () {
  return view('welcome');
})->where('vue_capture', '[\/\w\.-]*');

Auth::routes(['register' => false]);