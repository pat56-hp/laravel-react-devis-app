<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CategorieResource::collection(
            Categorie::orderByDesc('created_at')->withCount('projects')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|max:100|unique:categories',
            'status' => 'required',
        ]);

        $data = [
            'status' => $request->status == true ? 1 : 0,
            'libelle' => $request->libelle
        ];

        if (Categorie::create($data)) {
            return response()->json([
                'message' => 'Catégorie créée avec succes'
            ]);
        }

        return response()->json([
            'message' => 'Une s\'est produite pendant l\'enregistrement'
        ], 419);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function show(Categorie $categorie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categorie $categorie)
    {
        $request->validate([
            'libelle' => 'required|max:100',
            'status' => 'required',
        ]);

        $data = [
            'status' => $request->status == true ? 1 : 0,
            'libelle' => $request->libelle
        ];

        if ($categorie->update($data)) {
            return response()->json([
                'message' => 'Catégorie modifiée avec succes'
            ]);
        }

        return response()->json([
            'message' => 'Une s\'est produite pendant l\'enregistrement'
        ], 419);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categorie  $categorie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json([
            'message' => 'Catégorie supprimée avec succès'
        ]);
    }

    public function editState(Categorie $categorie){
        $status = $categorie->status === 1 ? 0 : 1;
        $message = $status === 1 ? 'activé' : 'désactivé';

        $categorie->update(['status' => $status]);

        return response()->json([
            'message' => "Catégorie $message avec succès"
        ]);
    }
}
