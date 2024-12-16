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
        Schema::table('category', function (Blueprint $table) {
            $table->integer('event_id')->after('idcategory'); // Adds column after 'id'

            // Add the foreign key constraint
            $table->foreign('event_id')->references('idevent')->on('event')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('category', function (Blueprint $table) {
            $table->dropForeign(['event_id']);

            // Drop the column
            $table->dropColumn('event_id');
        });
    }
};
