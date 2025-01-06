<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
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
}
