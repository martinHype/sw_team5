<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeederArticleStatus extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('acticle_status')->insert([
            [
                'acticle_status_name' => 'Open',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Awaiting Review',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Reviewed',
                'created_on' => now(),
                'modified_on' => now(),
            ],
        ]);
    }
}
