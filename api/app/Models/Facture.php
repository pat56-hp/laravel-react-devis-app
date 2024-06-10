<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref',
        'total',
        'sousTotal',
        'remise',
        'discount',
        'configRemise',
        'status',
        'send',
        'project_id',
        'user_id',
        'date'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function project(){
        return $this->belongsTo(Project::class)->with('client');
    }

    public function elements(){
        return $this->hasMany(Element::class);
    }

    public static function reference(){
        /* $seed = str_split('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        shuffle($seed); // probably optional since array_is randomized; this may be redundant
        $rand = '';
        foreach (array_rand($seed, 6) as $k) $rand .= $seed[$k];

        return 'FAC-'.$rand.'-'.(Facture::latest()->first()->id ?? 0) + 1; */

        $latestFactureId = Facture::latest()->first()->id ?? 1;
        $factureRef = str_pad(($latestFactureId ?? 0) + 1, 4, '0', STR_PAD_LEFT);
        return 'FAC-'.$factureRef;
    }
}
