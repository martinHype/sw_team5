<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController ;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\ArticleStatus;


Route::get('/check_table', function () {
    
});


Route::apiResource('article',ArticleController::class)->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::post("/logout",[AuthController::class,'logout'])->middleware('auth:sanctum');