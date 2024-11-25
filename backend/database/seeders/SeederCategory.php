<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeederCategory extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('category')->insert([
            [
                'category_name' => 'Biológia, ekológia a environmentalistika',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'category_name' => 'Geografia a regionálny rozvoj a Geológia',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'category_name' => 'Informatika',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'category_name' => 'Chémia, Fyzika a matematika',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'category_name' => 'Odborová didaktika',
                'created_on' => now(),
                'modified_on' => now(),
            ],
            [
                'category_name' => 'PhD',
                'created_on' => now(),
                'modified_on' => now(),
            ],
        ]);
    }
}