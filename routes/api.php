<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['name' => 'mobile.', 'as' => 'mobile.', 'prefix' => 'mobile', 'middleware' => ['guest', 'mobile.token'], 'namespace' => 'App\Http\Controllers\Api'], function() {

    Route::post('/login', 'UnauthenticatedController@login')->name('login');

    Route::post('/forgot-password', 'UnauthenticatedController@forgotPassword')->name('forgot-password');

});


Route::group(['name' => 'mobile.', 'as' => 'mobile.', 'prefix' => 'mobile', 'middleware' => ['auth:sanctum', 'mobile.token', 'verified', 'status'], 'namespace' => 'App\Http\Controllers\Api'], function() {

    Route::match(['get', 'post'], '/transactions/{id?}', 'AuthenticatedController@transactions')->name('transactions');

    Route::match(['get', 'post'], '/statements/{id?}', 'AuthenticatedController@statements')->name('statements');

});
