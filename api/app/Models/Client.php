<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $perPage = 10;

    protected $fillable = [
        'name', 'phone', 'email'
    ];

    public function projects(){
        return $this->hasMany(Project::class);
    }
}
