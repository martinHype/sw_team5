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
            $table->foreign(['acticle_status_idacticle_status'], 'fk_article_acticle_status1')->references(['idacticle_status'])->on('acticle_status')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['category_idcategory'], 'fk_article_category1')->references(['idcategory'])->on('category')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['event_idevent'], 'fk_article_event1')->references(['idevent'])->on('event')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['user_iduser'], 'fk_article_user')->references(['iduser'])->on('user')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['idreviewer'], 'fk_article_user1')->references(['iduser'])->on('user')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('article', function (Blueprint $table) {
            $table->dropForeign('fk_article_acticle_status1');
            $table->dropForeign('fk_article_category1');
            $table->dropForeign('fk_article_event1');
            $table->dropForeign('fk_article_user');
            $table->dropForeign('fk_article_user1');
        });
    }
};
