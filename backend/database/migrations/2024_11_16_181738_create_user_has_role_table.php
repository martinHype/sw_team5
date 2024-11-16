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
        Schema::create('user_has_role', function (Blueprint $table) {
            $table->integer('user_iduser')->index('fk_user_has_role_user1_idx');
            $table->integer('role_idrole')->index('fk_user_has_role_role1_idx');

            $table->primary(['user_iduser', 'role_idrole']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_has_role');
    }
};
