<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use \DB;
use \Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([[
            'name' => 'Jaynard L. Senilla',
            'email' => 'jaynard@gmail.com',
            'password' => Hash::make('jaynard'),
        ],[
            'name' => 'Kyla Jean Dumaguit',
            'email' => 'kyla@gmail.com',
            'password' => Hash::make('kyla'),
        ],[
            'name' => 'Jocelyn S. Amancio',
            'email' => 'jocelyn@gmail.com',
            'password' => Hash::make('jocelyn'),
        ],[
            'name' => 'Shenna Caneda',
            'email' => 'shenna@gmail.com',
            'password' => Hash::make('shenna'),
        ]]);
    }
}
