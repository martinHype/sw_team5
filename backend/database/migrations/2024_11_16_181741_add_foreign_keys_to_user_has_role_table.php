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
        Schema::table('user_has_role', function (Blueprint $table) {
            $table->foreign(['role_idrole'], 'fk_user_has_role_role1')->references(['idrole'])->on('role')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['user_iduser'], 'fk_user_has_role_user1')->references(['iduser'])->on('user')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_has_role', function (Blueprint $table) {
            $table->dropForeign('fk_user_has_role_role1');
            $table->dropForeign('fk_user_has_role_user1');
        });
    }
};
