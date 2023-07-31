<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Database\Seeder;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user = User::create([
            'name'     => 'Valentina',
            'email'    => 'valentina@gmail.com',
            'password' => bcrypt('admin123'),
        ]);

        $user->assignRole('Admin');
    }
}
