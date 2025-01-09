<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Event;

class DocumentController extends Controller
{

    public function upload(Request $request,$id)
    {
        $request->validate([
            'file_content' => 'required|string', // Base64 encoded content
            'file_name' => 'required|string',
            'file_type' => 'required|string', // MIME type
        ]);

        $fileContent = base64_decode($request->input('file_content'));

        if ($fileContent === false) {
            return response()->json(['error' => 'Invalid file content'], 400);
        }

        
        // Get file name and type
        $fileName = $request->input('file_name');
        $fileType = $request->input('file_type');

        
        $article = Article::find($id);
        $article_name = $article->title;
        $eventId = $article->event_idevent;
        $event_name = Event::find($eventId)->event_name;


        // Construct the file path
        $path = "uploads/{$event_name}/{$article_name}/{$fileName}";


        // Store the file in local storage
        Storage::put($path, $fileContent);

        Document::create([
            'article_idarticle' => $id,
            'document_name' => $fileName,
            'document_path' => $path,
        ]);

        return response()->json([
            'message' => 'File uploaded successfully!',
            'path' => $path,
            'type' => $fileType,
        ], 200);
    }
    /**
     * Get all documents for a specific article.
     *
     * @param int $article_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDocumentsByArticle($article_id)
    {
        // Fetch documents for the given article_id
        $documents = Document::where('article_idarticle', $article_id)->get();

        if ($documents->isEmpty()) {
            return response()->json(['message' => 'No documents found for this article.'], 404);
        }

        // Map the documents to include secure download URLs
        $documentsWithUrls = $documents->map(function ($document) {
            return [
                'id' => $document->iddocument,
                'name' => basename($document->document_path), // Extract filename
                'url' => route('document.download', ['path' => urlencode($document->document_path)]), // Generate download URL
            ];
        });

        return response()->json($documentsWithUrls);
    }

    /**
     * Download a specific document by its path.
     *
     * @param string $path
     * @return \Symfony\Component\HttpFoundation\StreamedResponse|\Illuminate\Http\JsonResponse
     */
    public function downloadDocument($path)
    {
        // Decode the path if it's URL-encoded
        $decodedPath = urldecode($path);

        // Check if the file exists
        if (!Storage::exists($decodedPath)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        // Stream the file as a download
        return response()->streamDownload(
            function () use ($decodedPath) {
                echo Storage::get($decodedPath);
            },
            basename($decodedPath) // Filename for the download
        );
    }

    public function deleteDocument($document_id){
        $document = Document::find($document_id);
        if(!$document) {
            return response()->json(['error' => 'Document not found'], 404);
        }
        // Retrieve the file path
        $filePath = $document->document_path;

         // Check if the file exists in storage
        if (Storage::exists($filePath)) {
            // Delete the file from storage
            Storage::delete($filePath);
        } else {
            return response()->json(['error' => 'File not found in storage'], 404);
        }

        // Delete the document record from the database
        $document->delete();

        return response()->json(['message' => 'Document deleted successfully'], 200);
    
    }
}
