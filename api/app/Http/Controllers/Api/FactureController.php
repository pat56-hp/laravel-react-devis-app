<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FactureResource;
use App\Models\Element;
use App\Models\Facture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FactureResource::collection(
            auth()->user()->role == 1
            ? Facture::with('project')->orderByDesc('created_at')->get()
            : Facture::where('user_id', auth()->id())->with('project')->orderByDesc('created_at')->get(),
            
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
            'elements' => 'required|array',
            'facture' => 'required',
            'remise' => 'required|integer',
            'sousTotal' => 'required|integer',
            'total' => 'required|integer',
            'configRemise' => 'required',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'ref' => Facture::reference(),
                'date' => $request->facture['date'],
                'project_id' => $request->facture['project_id'],
                'total' => $request->total,
                'sousTotal' => $request->sousTotal,
                'discount' => $request->discount,
                'remise' => $request->remise,
                'configRemise' => $request->configRemise,
                'status' => $request->facture['status'],
                'user_id' => auth()->id(),
            ];
    
            if ($facture = Facture::create($data)) {
                //Sauvegarde des elements
                foreach($request->elements as $element) {
                    Element::create([
                        'facture_id' => $facture->id,
                        'libelle' => $element['libelle'],
                        'qty' => $element['qty'],
                        'prix' => $element['prix'],
                        'montant' => $element['montant'],
                        'description' => $element['description'],
                    ]);
                }

                DB::commit();
    
                return response()->json([
                    'message' => 'Facture enregistrée avec succès'
                ]);
            }
    
            DB::rollBack();
            return response()->json([
                'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement'
            ], 419);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement',
                'data' => $th->getMessage()
            ], 419);
        }

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function show(Facture $facture)
    {
        $facture->load(['elements', 'project']);
        return response()->json([
            'facture' => $facture
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Facture $facture)
    {
        $request->validate([
            'elements' => 'required|array',
            'facture' => 'required',
            'remise' => 'required|integer',
            'sousTotal' => 'required|integer',
            'total' => 'required|integer',
            'configRemise' => 'required',
        ]);

        DB::beginTransaction();

        try {
            $data = [
                'date' => $request->facture['date'],
                'project_id' => $request->facture['project_id'],
                'total' => $request->total,
                'sousTotal' => $request->sousTotal,
                'discount' => $request->discount,
                'remise' => $request->remise,
                'configRemise' => $request->configRemise,
                'status' => $request->facture['status'],
                'user_id' => auth()->id(),
            ];
    
            if ($facture->update($data)) {
                //Sauvegarde des elements
                $facture->elements()->delete();
                foreach($request->elements as $element) {
                    Element::create([
                        'facture_id' => $facture->id,
                        'libelle' => $element['libelle'],
                        'qty' => $element['qty'],
                        'prix' => $element['prix'],
                        'montant' => $element['montant'],
                        'description' => $element['description'],
                    ]);
                }

                DB::commit();
    
                return response()->json([
                    'message' => 'Facture modifiée avec succès'
                ]);
            }
    
            DB::rollBack();
            return response()->json([
                'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement'
            ], 419);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'Oups, une erreur s\'est produite pendant l\'enregistrement',
                'data' => $th->getMessage()
            ], 419);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Facture  $facture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Facture $facture)
    {
        DB::beginTransaction();

        try{
            $facture->elements()->delete();
            $facture->delete();
            DB::commit();

            return response()->json([
                'message' => 'Facture supprimée avec succès'
            ]);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'message' => 'Une erreur s\'est produite lors de la suppression : ' . $e->getMessage(),
            ], 419);
        }
    }
}
