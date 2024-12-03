<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(){
        return Article::all();
    }

    public function store(Request $request ){
        $fields = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:500',
            'category' => 'required',
        ]);

        $article = Article::create([
            'title' => $fields['title'],
            'Description' => $fields['description'],
            'event_idevent' => 1,
            'acticle_status_idacticle_status' => 1,
            'category_idcategory' => $fields['category'],
            'user_iduser' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Article created successfully!',
            'article_id' => $article->idarticle,
        ], 201);
    }

    
}
