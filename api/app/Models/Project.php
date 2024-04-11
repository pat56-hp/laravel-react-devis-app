<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $perPage = 10;

    protected $fillable = [
        'category_id',
        'client_id',
        'title',
        'description',
        'file',
        'status',
        'begin_date',
        'end_date',
    ];

    public function category(){
        return $this->belongsTo(Categorie::class);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }
}
