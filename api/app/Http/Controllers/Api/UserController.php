<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Http\Resources\UserResource;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class UserController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api');
    }

    public function getdatas(){
        $data = [
            'totalProject' => auth()->user()->role == 1 ? Project::all()->count() : auth()->user()->projects->count(),
            'totalProjectEnCours' => auth()->user()->role == 1 ? Project::where('status', 1)->count() : auth()->user()->projects->where('status', 1)->count(),
            'totalProjectTermine' => auth()->user()->role == 1 ? Project::where('status', 2)->count() : auth()->user()->projects->where('status', 2)->count(),
            'clients' => ClientResource::collection(
                auth()->user()->role == 1 
                ? Client::orderByDesc('created_at')->withCount('projects')->take(10)->get()
                : Client::where('user_id', auth()->id())->orderByDesc('created_at')->withCount('projects')->take(10)->get()
            )
        ];

        return response()->json($data);
    }

    //Modification du profil
    public function profile(Request $request){
        $data = $request->validate([
            'name' => 'required|max:255|string',
            'profession' => 'nullable|max:255|string',
            'phone' => 'required|max:20',
            'adresse' => 'required|max:255',
            'email' => ['required', 'max:255', 'email', Rule::unique('users')->where(function($q){ $q->where('id', '!=', auth('api')->id()); })],
        ]);

        if (auth('api')->user()->update($data)) {
            return response()->json([
                'message' => 'Informations modifiées avec succès.',
                'user' => auth('api')->user()
            ]);
        }else{
            return response()->json([
                'message' => 'Une erreur s\'est produite lors de l\'enregistrement.',
            ], 419);
        }
    }

    public function updatePassword(Request $request){
        $request->validate([
            'password' => ['required'],
            'newpassword' => ['required', Password::min(8)->letters()->symbols()],
            'confirmation' => ['required', 'same:newpassword']
        ]);

        if (Hash::check($request->password, auth()->user()->password)) {
            auth()->user()->update([
                'password' => Hash::make($request->newpassword)
            ]);

            return response()->json([
                'message' => 'Mot de passe mis à jour avec succès',
                'user' => auth()->user()
            ]);
        }

        return response()->json([
            'message' => 'Votre mot de passe actuel est incorrecte',
        ], 419);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(
            User::orderByDesc('created_at')->paginate()
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
        //dd($request->all());
    
        $request->validate([
            'name' => 'required|max:255|string',
            'profession' => 'nullable|max:255|string',
            'role' => 'required|integer',
            'phone' => 'required|max:20',
            'adresse' => 'required|max:255',
            'email' => ['required', 'max:255', 'email', 'unique:users,email'],
            'password' => ['required', 'max:255', Password::min(8)->letters()->symbols()]
        ]);

        $data = [
            'name' => $request->name,
            'role' => $request->role,
            'phone' => $request->phone,
            'adresse' => $request->adresse,
            'profession' => $request->profession,
            'password' => Hash::make($request->password),
            'status' => $request->status === true ? 1 : 0 
        ];

        if (User::create($data)) {
            return response()->json([
                'message' => 'Utilisateur enregistré avec succès',
            ]);
        }

        return response()->json([
            'message' => 'Une erreur s\'est produite lors de l\'enregistrement.',
        ], 419);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|max:255|string',
            'profession' => 'nullable|max:255|string',
            'phone' => 'required|max:20',
            'adresse' => 'required|max:255',
            'role' => 'required|integer',
            'email' => ['required', 'max:255', 'email', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'max:255', Password::min(8)->letters()->symbols()]
        ]);

        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'adresse' => $request->adresse,
            'role' => $request->role,
            'profession' => $request->profession,
            'email' => $request->email,
            'password' => !empty($request->password) ? Hash::make($request->password) : $user->password,
        ];

        if ($user->update($data)) {
            return response()->json([
                'message' => 'Utilisateur modifié avec succès',
            ]);
        }

        return response()->json([
            'message' => 'Une erreur s\'est produite lors de l\'enregistrement.',
        ], 419);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Utilisateur supprimé avec succès'
        ]);
    }

    public function editState(User $user){
        $status = $user->status === 1 ? 0 : 1;
        $message = $status === 1 ? 'activé' : 'désactivé';

        $user->update(['status' => $status]);

        return response()->json([
            'message' => "Utilisateur $message avec succès"
        ]);
    }
}
