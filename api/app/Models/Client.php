<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $perPage = 50;

    protected $fillable = [
        'name', 'phone', 'email', 'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function projects(){
        return $this->hasMany(Project::class);
    }
}
