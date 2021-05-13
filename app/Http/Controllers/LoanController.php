<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoanModel;
use App\Models\User;

class LoanController extends Controller
{
    public function loanMoney(Request $request){
        $user = User::where('email','jaynard@gmail.com')->first();
        $user->loans()->create($request->all());
        return $user->loans;
    }

}
