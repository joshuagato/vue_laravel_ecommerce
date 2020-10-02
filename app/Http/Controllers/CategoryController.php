<?php

namespace App\Http\Controllers;

use App\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
  // Controller function for fetching all categories
  public function index()
  {
    $allCategories = Category::all();
    return ['categories' => $allCategories];
  }

  // Controller function for creating a category
  public function store(Request $request) {
    $newCategory = new Category;
    $newCategory->title = $request->title;

    $newCategory->save();
    return ['success' => true];
  }

  // Controller function for fetching one category
  public function show($id)
  {
    $oneCategory = Category::where('id', $id)->first();
    return ['category' => $oneCategory];
  }
}
