<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('acticle_status', function (Blueprint $table) {
            $table->integer('idacticle_status', true);
            $table->string('acticle_status_name', 45);
            $table->date('created_on');
            $table->date('modified_on');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acticle_status');
    }
};
