<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FileUploadController;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\ArticleStatus;
use App\Models\Article;



Route::post('/check_table', function (Request $request) {
    return 'hello there';
})->middleware('auth:sanctum');;


Route::apiResource('article',ArticleController::class)->middleware('auth:sanctum');


Route::post('upload', [FileUploadController::class, 'upload'])->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::post("/logout",[AuthController::class,'logout'])->middleware('auth:sanctum');