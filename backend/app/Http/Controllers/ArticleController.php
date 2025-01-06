<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\DocumentController;

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
    
    public function getArticle($id){
        try {
            // Fetch articles associated with the given conference ID
            $article = Article::where('idarticle', $id)
                ->with('user:iduser,firstname,lastname') // Include user details
                ->leftJoin('category', 'article.category_idcategory', '=', 'category.idcategory')
                ->first();
            if (!$article) {
                return response()->json(['message' => 'Article not found.'], 404);
            }
            $documentController = new DocumentController();
            $documentResponse = $documentController->getDocumentsByArticle($id);
            // Add documents to the article response
            if ($documentResponse->getStatusCode() === 200) {
                $article->documents = $documentResponse->getData(); // Attach documents to article
            } else {
                $article->documents = []; // No documents found
            }
            return response()->json($article, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Article not found',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getArticles($event_id)
    {
        try {
            // Fetch articles associated with the given conference ID
            $articles = Article::where('event_idevent', $event_id)
                ->with('user:iduser,firstname,lastname') // Include user details
                ->leftJoin('category', 'article.category_idcategory', '=', 'category.idcategory')
                ->get();
            return response()->json($articles, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching articles.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function addArticleReviewer(Request $request, $articleId)
    {
        try {
            // Validate the input
            $request->validate([
                'reviewer_id' => 'required|exists:user,iduser', // Ensure reviewer_id exists in users table
            ]);

            // Find the article by its ID
            $article = Article::findOrFail($articleId);

            // Assign the reviewer_id to the article
            $article->idreviewer = $request->input('reviewer_id');
            $article->save();

            return response()->json([
                'message' => 'Reviewer successfully assigned to the article.',
                'article' => $article,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while assigning the reviewer.',
                'error' => $e->getMessage(),
            ], 500);
        }
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

    public function evaluateArticle(Request $request){
        $fields = $request->validate([
            'articleid' => 'required|integer',
            'statusid' => 'required|integer',
            'actuality_difficulty' => 'nullable|string',
            'orientation_in_theme' => 'nullable|string',
            'work_corresponding_template' => 'nullable|string',
            'missing_slovak_or_english_title' => 'nullable|boolean',
            'missing_slovak_or_english_abstract' => 'nullable|boolean',
            'missing_abstract_length' => 'nullable|boolean',
            'missing_part' => 'nullable|boolean',
            'positive_review' => 'nullable|string',
            'negative_review' => 'nullable|string',
        ]);

        // Find the article by its ID
        $article = Article::find($fields['articleid']);

        // Update the article with the provided fields
        $article->update([
            'acticle_status_idacticle_status' => $fields['statusid'],
            'actuality_difficulty' => $fields['actuality_difficulty'],
            'orientation_in_theme' => $fields['orientation_in_theme'],
            'work_corresponding_template' => $fields['work_corresponding_template'],
            'missing_slovak_or_english_title' => $fields['missing_slovak_or_english_title'],
            'missing_slovak_or_english_abstract' => $fields['missing_slovak_or_english_abstract'],
            'missing_abstract_length' => $fields['missing_abstract_length'],
            'missing_part' => $fields['missing_part'],
            'positive_review' => $fields['positive_review'],
            'negative_review' => $fields['negative_review'],
        ]);

        return response()->json(['message' => 'Article updated successfully.', 'article' => $article], 200);
    }
}
