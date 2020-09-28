<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartitemsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if ( !Schema::hasTable('cartitems') ) {
      Schema::create('cartitems', function (Blueprint $table) {
        $table->id();
        $table->integer('cart');
        $table->string('cart_uuid');
        $table->integer('product');
        $table->integer('qty');
        $table->double('unit_price');
        $table->double('sub_total');
        $table->timestamps();
      });
    }
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('cartitems');
  }
}
