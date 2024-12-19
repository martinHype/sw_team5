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
            'event' => 'required',
            'status' => 'required',
        ]);

        $article = Article::create([
            'title' => $fields['title'],
            'Description' => $fields['description'],
            'event_idevent' => $fields['event'],
            'acticle_status_idacticle_status' => 1,
            'category_idcategory' => $fields['category'],
            'user_iduser' => auth()->id(),
            'acticle_status_idacticle_status' => $fields['status'],
        ]);

        return response()->json([
            'message' => 'Article created successfully!',
            'article_id' => $article->idarticle,
        ], 201);
    }

    public function updateStatus(Request $request)
    {
        $fields = $request->validate([
            'articleid' => 'required|integer',
            'statusid' => 'required|integer',
        ]);

        // Find the article and update the status
        $article = Article::find($fields['articleid']);
        $article->acticle_status_idacticle_status = $fields['statusid'];
        $article->save();

        return response()->json([
            'message' => 'Article status updated successfully!',
            'article_id' => $article->idarticle,
            'new_status' => $article->acticle_status_idacticle_status,
        ], 200);
    }

    
}
