<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function fetchCategories(Request $request)
    {
        $query = $request->get('query', '');

        // Fetch categories that match the query (case-insensitive)
        $categories = Category::where('category_name', 'LIKE', "%{$query}%")
            ->distinct()
            ->pluck('category_name');

        return response()->json($categories, 200);
    }
}
