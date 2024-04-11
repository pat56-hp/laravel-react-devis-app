<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Element extends Model
{
    use HasFactory;

    protected $fillable = [
        'facture_id',
        'libelle',
        'qty',
        'prix',
        'montant',
        'description'
    ];

    public function facture(){
        return $this->belongsTo(Facture::class);
    }
}
