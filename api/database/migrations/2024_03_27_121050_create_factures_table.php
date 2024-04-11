<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects', 'id');
            $table->string('ref');
            $table->integer('discount')->default(0);
            $table->double('remise')->default(0);
            $table->string('configRemise')->default('%');
            $table->double('sousTotal')->default(0);
            $table->double('total')->default(0);
            $table->integer('status')->default(0);
            $table->integer('send')->default(0);
            $table->date('date')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('factures');
    }
}
