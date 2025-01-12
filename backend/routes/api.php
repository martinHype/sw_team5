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
use App\Http\Controllers\DocumentController;



Route::post('/check_table', function (Request $request) {
    return 'hello there';
})->middleware('auth:sanctum');;


//Route::apiResource('article',ArticleController::class)->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    //articles

});

Route::middleware('auth:sanctum')->group(function () {
    //articles
    Route::get('article/{id}',[ArticleController::class, 'getArticle']);
    Route::get('article',[ArticleController::class, 'index']);
    Route::post('article',[ArticleController::class, 'store']);
    Route::post('/article/{id}/upload', [DocumentController::class, 'upload']);
    Route::put('evaluateArticle/{id}', [ArticleController::class, 'evaluateArticle']);
    Route::get('document/{id}',[DocumentController::class,'getDocumentsByArticle']);
    Route::put('/article/{id}/updateArticle', [ArticleController::class, 'updateArticle']);
    Route::delete('/document/{id}', [DocumentController::class, 'deleteDocument']);

});



// Route to get all documents for a specific article
//Route::get('/document/{article_id}', [DocumentController::class, 'getDocumentsByArticle']);

// Route to download a specific document
Route::get('/document/download/{path}', [DocumentController::class, 'downloadDocument'])
    ->where('path', '.*') // Allow paths with slashes
    ->name('document.download');



Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);


Route::get('/events', [EventController::class, 'index']);
Route::get('/studentevents', [EventController::class, 'getEvents'])->middleware('auth:sanctum');

Route::post('/article/updateArticle/{id}', [ArticleController::class, 'updateArticle']);

Route::get('/events/{id}/articles', [EventController::class, 'showArticles']);


Route::middleware('auth:sanctum')->group(function () {
    //admin
    Route::post('/admin/events', [EventController::class, 'store']);
    Route::get('/get-admin-events', [EventController::class, 'getAdminEvents']);
    Route::get('/admin/categories', [CategoryController::class, 'fetchCategories']);
    Route::get('/admin/get-event-detail/{id}', [EventController::class, 'getAdminEventDetail']);
    Route::get('/admin/conference/{id}', [EventController::class, 'getAdminEvent']);
    Route::get('/admin/conference/{id}/users', [EventController::class, 'getAdminEventUsers']) ->name('EventUsers');
    Route::get('/admin/roles/reviewers', [UserController::class, 'getReviewers']);
    Route::get('/admin/conference/{id}/articles', [ArticleController::class, 'getArticles']);
    Route::post('/admin/articles/{articleId}/assign-reviewer', [ArticleController::class, 'addArticleReviewer']) ->name('addArticleReviewer');
    Route::get('/admin/events/{eventId}/categories', [CategoryController::class, 'getCategoriesByEventId']);
    Route::put('/admin/events/{id}', [EventController::class, 'update']);
    Route::patch('/admin/categories/{id}/deactivate', [CategoryController::class, 'deactivate']);
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::get('/admin/all-users', [UserController::class, 'getAllUsers']);
    Route::patch('/admin/users/{userId}/roles', [UserController::class, 'updateUserRole']);



    Route::post("/logout",[AuthController::class,'logout']);
});

