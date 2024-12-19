<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FileUploadController;



Route::post('/check_table', function (Request $request) {
    return 'hello there';
})->middleware('auth:sanctum');;


Route::apiResource('article',ArticleController::class)->middleware('auth:sanctum');


Route::post('upload', [FileUploadController::class, 'upload'])->middleware('auth:sanctum');


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);


Route::get('/events', [EventController::class, 'index']);
Route::get('/studentevents', [EventController::class, 'getEvents'])->middleware('auth:sanctum');

Route::post('/article/update-status', [ArticleController::class, 'updateStatus']);

Route::get('/events/{id}/articles', [EventController::class, 'showArticles']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/events', [EventController::class, 'store']);
    Route::get('/get-admin-events', [EventController::class, 'getAdminEvents']);
    Route::get('/categories', [CategoryController::class, 'fetchCategories']);

    Route::post("/logout",[AuthController::class,'logout']);
});

