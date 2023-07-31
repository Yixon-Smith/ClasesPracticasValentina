<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *  @return void
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            RoleHasPermissionSeeder::class,
            UsersSeeder::class,
        ]);
        // $this->call(EstudiantesSeeder::class);
        // $this->call(ProfesoresSeeder::class);
        // $this->call(CarrerasSeeder::class);
        // $this->call(DocumentoServicioComunitarioSeeder::class);
    }
}
