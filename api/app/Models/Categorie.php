<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $perPage = 10;

    protected $fillable = ['libelle', 'status'];

    public function projects(){
        return $this->hasMany(Project::class, 'category_id');
    }
}
