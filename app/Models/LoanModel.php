<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'purpose',
    ];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
}
