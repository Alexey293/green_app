<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Crear 10 usuarios
        $roles = Role::factory(10)->create();

        //Crea 10 usuarios y asignarles roles aleatorios
        User::factory(10)->create()->each(function ($user) use ($roles) {
            //Asigna entre 1 y 3 roles aleatorios a cada usuario
            $user->roles()->attach(
                $roles->random(rand(1, 3))->pluck('id')->toArray()
            );
                }); 

    }
}
