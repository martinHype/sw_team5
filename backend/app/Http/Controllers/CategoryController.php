<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function fetchCategories()
    {
        $categories = Category::query()
            ->distinct()
            ->pluck('category_name');

        return response()->json($categories, 200);
    }

    public function getCategoriesByEventId($eventId)
    {
        $categories = Category::query()
            ->where('is_active', 1)
            ->where('event_id', $eventId)
            ->get();

        return response()->json($categories);
    }

    public function deactivate($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->is_active = false;
        $category->save();

        return response()->json(['message' => 'Category deactivated successfully']);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'event_id' => 'required|integer|exists:event,idevent',
            'category_name' => 'required|string|max:255',
        ]);

        try{
            $category = Category::create([
                'event_id' => $validatedData['event_id'],
                'category_name' => $validatedData['category_name'],
                'created_on' =>now(),
                'modified_on' =>now(),
                'is_active' => true,
            ]);
            return response()->json(['message' => 'Category added successfully', 'category' => $category], 201);
        }catch (\Exception $exception){
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

}
