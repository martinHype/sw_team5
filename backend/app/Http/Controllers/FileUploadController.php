<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;
use App\Models\Article;
use App\Models\Event;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file_content' => 'required|string', // Base64 encoded content
            'file_name' => 'required|string',
            'file_type' => 'required|string', // MIME type
            'article_id' => 'required|int',
        ]);

        $fileContent = base64_decode($request->input('file_content'));

        if ($fileContent === false) {
            return response()->json(['error' => 'Invalid file content'], 400);
        }

        
        // Get file name and type
        $fileName = $request->input('file_name');
        $fileType = $request->input('file_type');
        $article_id = $request->input('article_id');

        
        $article = Article::find($article_id);
        $article_name = $article->title;
        $eventId = $article->event_idevent;
        $event_name = Event::find($eventId)->event_name;


        // Construct the file path
        $path = "uploads/{$event_name}/{$article_name}/{$fileName}";


        // Store the file in local storage
        Storage::put($path, $fileContent);

        Document::create([
            'article_idarticle' => $article_id,
            'document_name' => $fileName,
            'document_path' => $path,
        ]);

        return response()->json([
            'message' => 'File uploaded successfully!',
            'path' => $path,
            'type' => $fileType,
        ], 200);
    }

    public function getEventIdByArticleId($articleId)
    {
        // Find the article by its ID
        $article = Article::find($articleId);

        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        // Access the associated event's ID
        $eventId = $article->event->id;

        return response()->json(['event_id' => $eventId]);
    }
}
