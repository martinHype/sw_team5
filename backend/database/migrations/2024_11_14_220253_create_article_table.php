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
        Schema::create('article', function (Blueprint $table) {
            $table->integer('idarticle', true);
            $table->integer('user_iduser')->index('fk_article_user_idx');
            $table->string('title');
            $table->string('Description', 500)->nullable();
            $table->integer('event_idevent')->index('fk_article_event1_idx');
            $table->integer('status_idstatus');
            $table->integer('acticle_status_idacticle_status')->index('fk_article_acticle_status1_idx');
            $table->integer('category_idcategory')->index('fk_article_category1_idx');
            $table->integer('idreviewer')->index('fk_article_user1_idx');
            $table->string('positive_review', 500)->nullable();
            $table->string('negative_review', 500)->nullable();
            $table->date('created_on');
            $table->date('modified_on');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article');
    }
};
