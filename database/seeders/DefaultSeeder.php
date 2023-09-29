<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Rotimi Bolorunduro',
            'phone' => '08107638157',
            'email' => 'rb@sanlam.com.ng',
            'password' => Hash::make('Password@1'),
            'dob' => '1997-08-17',
            'gender' => 'm',
            'status' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
