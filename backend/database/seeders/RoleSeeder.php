<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RoleSeeder extends Seeder
{
    public function run()
    {
        DB::table('role')->insert([
            ['idrole' => 1, 'role_name' => 'student', 'created_on' => Carbon::now(), 'modified_on' => Carbon::now()],
            ['idrole' => 2, 'role_name' => 'reviewer', 'created_on' => Carbon::now(), 'modified_on' => Carbon::now()],
            ['idrole' => 3, 'role_name' => 'admin', 'created_on' => Carbon::now(), 'modified_on' => Carbon::now()],
        ]);
    }
}
