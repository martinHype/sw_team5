<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getReviewers()
    {
        try {
            $reviewers = User::whereHas('roles', function ($query) {
                $query->where('idrole', 2);
            })->get();

            return response()->json($reviewers, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching reviewers.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
