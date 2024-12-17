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
                'acticle_status_name' => 'Koncept',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Čaká na recenziu',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Prebieha kontrola',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Publikovať v predloženej forme',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Publikovať po zapracovaní pripomienok',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'acticle_status_name' => 'Neprijať pre publikovanie',
                'created_on' => now(),
                'modified_on' => now(),
            ],
        ]);
    }
}
