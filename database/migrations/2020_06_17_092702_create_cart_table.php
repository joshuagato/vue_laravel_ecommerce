<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if ( !Schema::hasTable('carts') ) {
      Schema::create('carts', function (Blueprint $table) {
        $table->id();
        $table->string('cart_uuid');
        $table->integer('total_qty');
        $table->double('total_price');
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
    Schema::dropIfExists('carts');
  }
}
