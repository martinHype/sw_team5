<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/events', [EventController::class, 'store']);

    //admin
    Route::get('/get-admin-events', [EventController::class, 'getAdminEvents']);
    Route::get('/categories', [CategoryController::class, 'fetchCategories']);
    Route::get('/admin/get-event-detail/{id}', [EventController::class, 'getAdminEventDetail']);
    Route::get('/admin/conference/{id}/users', [EventController::class, 'getAdminEventUsers']) ->name('EventUsers');
    Route::get('/admin/roles/reviewers', [UserController::class, 'getReviewers']);
    Route::get('/admin/conference/{id}/articles', [ArticleController::class, 'getArticles']);
    Route::post('/admin/articles/{articleId}/assign-reviewer', [ArticleController::class, 'addArticleReviewer']) ->name('addArticleReviewer');


    Route::post("/logout",[AuthController::class,'logout']);
});

