<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('article_has_keywords')) {
            Schema::create('article_has_keywords', function (Blueprint $table) {
                $table->id();
                $table->foreignId('keyword_id')->constrained('key_words')->onDelete('cascade');
                $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('article_has_keywords');
    }
};
