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
        Schema::create('role_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->integer('role_id');
            $table->timestamps();

            // Foreign keys
            $table->foreign('user_id')->references('iduser')->on('user')->onDelete('cascade');
            $table->foreign('role_id')->references('idrole')->on('role')->onDelete('cascade');

            // Unique constraint to prevent duplicate role assignments
            $table->unique(['user_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};
