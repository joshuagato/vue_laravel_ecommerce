<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ViewedProduct;

class ViewedProductsController extends Controller
{
  // Controller function for fetching all viewed products
  public function index($uuid)
  {
    $allProducts = ViewedProduct::where('viewed_uuid', $uuid)->get();
    if ($allProducts->count() < 1) return ['success' => false];

    return ['success' => true, 'products' => $allProducts];
  }

  // Controller function for adding a product to the viewed products list
  public function store(Request $request)
  {
    $uuid = $request->uuid;
    $product = $request->product;
    if (empty($request->uuid) || empty($request->product)) return ['success' => false];

    $existingProduct = ViewedProduct::where(['viewed_uuid' => $uuid, 'product' => $product])->first();
    if ($existingProduct) return ['existing' => true];

    $existingUserProducts = ViewedProduct::where('viewed_uuid', $uuid)->orderBy('id', 'ASC')->get();
    if ($existingUserProducts->count() == 10) {
      $firstProduct = $existingUserProducts[0];
      $this->destroy($firstProduct->id);
    }

    $newViewedProduct = new ViewedProduct;
    $newViewedProduct->viewed_uuid = $uuid;
    $newViewedProduct->product = $product;
    $newViewedProduct->save();

    return ['success' => true];
  }

  // Controller function for deleting the first product in the viewed products array
  public function destroy($id)
  {
    $oldProduct = ViewedProduct::where('id', $id)->first();
    $oldProduct->delete();

    return ['success' => true];
  }
}
