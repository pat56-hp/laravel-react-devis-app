<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\FactureController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function() {

    Route::group(['prefix' => 'auth'], function(){
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });

    Route::get('/getdatas', [UserController::class, 'getdatas']);

    Route::post('profile', [UserController::class,'profile']);

    Route::group(['prefix' => 'users'], function(){
        Route::get('/', [UserController::class, 'index']);
        Route::post('/store', [UserController::class, 'store']);
        Route::post('/update/{user}', [UserController::class, 'update']);
        Route::get('/delete/{user}', [UserController::class, 'destroy']);
        Route::get('/edit-state/{user}', [UserController::class, 'editState']);
    });

    Route::group(['prefix' => 'clients'], function(){
        Route::get('/', [ClientController::class, 'index']);
        Route::post('/store', [ClientController::class, 'store']);
        Route::post('/update/{client}', [ClientController::class, 'update']);
        Route::get('/delete/{client}', [ClientController::class, 'destroy']);
    });

    Route::group(['prefix' => 'categories'], function(){
        Route::get('/', [CategorieController::class, 'index']);
        Route::post('/store', [CategorieController::class, 'store']);
        Route::put('/update/{categorie}', [CategorieController::class, 'update']);
        Route::delete('/delete/{categorie}', [CategorieController::class, 'destroy']);
        Route::get('/edit-state/{categorie}', [CategorieController::class, 'editState']);
    });

    Route::group(['prefix' => 'projects'], function(){
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/store', [ProjectController::class, 'store']);
        Route::get('/show/{project}', [ProjectController::class, 'show']);
        Route::post('/update/{project}', [ProjectController::class, 'update']);
        Route::delete('/delete/{project}', [ProjectController::class, 'destroy']);
    });

    Route::group(['prefix' => 'factures'], function(){
        Route::get('/', [FactureController::class, 'index']);
        Route::post('/store', [FactureController::class, 'store']);
        Route::get('/show/{facture}', [FactureController::class, 'show']);
        Route::put('/update/{facture}', [FactureController::class, 'update']);
        Route::delete('/delete/{facture}', [FactureController::class, 'destroy']);
    });
});

