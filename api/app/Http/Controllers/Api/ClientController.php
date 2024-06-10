<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class ClientController extends Controller
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
        return ClientResource::collection(
            auth()->user()->role == 1 
            ? Client::orderByDesc('created_at')->withCount('projects')->paginate()
            : Client::where('user_id', auth()->id())->orderByDesc('created_at')->withCount('projects')->paginate()
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
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => ['nullable', 'email', Rule::unique('clients')->where(fn($q) => $q->whereNotNull('email'))]
        ]);

        $data['user_id'] = auth()->id();

        if (Client::create($data)) {
            return response()->json([
                'message' => 'Client enregistré avec succès'
            ]);
        }

        return response()->json([
            'message' => 'Une erreur s\'est produite lors de l\'enregistrement.',
        ], 419);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => ['nullable', 'email', Rule::unique('clients')->where(fn($q) => $q->whereNotNull('email')->where('id', '!=', $client->id))]
        ]);

        $data['user_id'] = auth()->id();

        if ($client->update($data)) {
            return response()->json([
                'message' => 'Client modifié avec succès'
            ]);
        }

        return response()->json([
            'message' => 'Une erreur s\'est produite lors de l\'enregistrement.',
        ], 419);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        if ($client->delete()){
            $client->projects()->delete();
            return response()->json([
                'message' => 'Client supprimé avec succès'
            ]);
        }

        return response()->json([
            'message' => 'Une erreur s\'est produite lors de la suppression.',
        ], 419);
    }
}
