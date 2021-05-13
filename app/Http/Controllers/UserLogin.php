<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use \Hash;

class UserLogin extends Controller
{
    public function login(Request $request)
    {
        // $users = User::all();
        $user = User::where('email',$request->email)->first();
        return ($user) ? response()->json($user)
                     : false;
    }

    public function getLoanHistory(){
        $user = User::where('email','jaynard@gmail.com')->first();
        return $user->loans;
    }
}
