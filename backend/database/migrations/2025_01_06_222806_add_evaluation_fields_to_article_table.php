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
        Schema::table('article', function (Blueprint $table) {
            $table->string('actuality_difficulty')->nullable(); // Example: Add a nullable string column
            $table->string('orientation_in_theme')->nullable(); // Example: Add a nullable text column
            $table->string('work_corresponding_template')->nullable(); // Example: Add a nullable integer column
            $table->boolean('missing_slovak_or_english_title')->nullable(); // Example: Add a nullable integer column
            $table->boolean('missing_slovak_or_english_abstract')->nullable(); // Example: Add a nullable integer column
            $table->boolean('missing_abstract_length')->nullable(); // Example: Add a nullable integer column
            $table->boolean('missing_part')->nullable(); // Example: Add a nullable integer column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('article', function (Blueprint $table) {
            Schema::dropIfExists('article');
        });
    }
};
