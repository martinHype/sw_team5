<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
    public function getAllUsers(){
        $users = User::with('roles')->get();

        // Map the users to include roles as an array of role names
        $users = $users->map(function ($user) {
            return [
                'id' => $user->iduser, // Use the correct primary key (iduser)
                'name' => trim(($user->firstname ?? '') . ' ' . ($user->lastname ?? '')), // Combine first and last name
                'email' => $user->email,
                'roles' => $user->roles->pluck('role_name')->toArray(), // Extract role names as an array
            ];
        });

        return response()->json($users, 200);
    }
    public function updateUserRole(Request $request, $userId)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'role' => 'required|string|exists:role,role_name', // Validate role name
            'isAssigned' => 'required|boolean',               // Validate boolean for isAssigned
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Find the user and the role
        $user = User::findOrFail($userId);
        $role = Role::where('role_name', $request->input('role'))->first();

        if (!$role) {
            return response()->json(['error' => 'Role not found'], 404);
        }

        // Assign or remove the role
        if ($request->input('isAssigned')) {
            $user->roles()->syncWithoutDetaching([$role->idrole]); // Add role without removing others
        } else {
            $user->roles()->detach($role->idrole); // Remove the role
        }

        return response()->json(['message' => 'Role updated successfully.'], 200);
    }

    public function getProfile()
    {
        $user = Auth::user(); // Získa aktuálneho autentifikovaného používateľa

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'email' => $user->email,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user(); // Získa aktuálneho autentifikovaného používateľa

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validácia vstupných údajov
        $validatedData = $request->validate([
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($user->getAttribute('iduser'), 'iduser'),
            ],
            'firstname' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
        ]);

        if (isset($validatedData['email'])) {
            $user->setAttribute('email', $validatedData['email']);
        }

        if (isset($validatedData['firstname'])) {
            $user->setAttribute('firstname', $validatedData['firstname']);
        }

        if (isset($validatedData['lastname'])) {
            $user->setAttribute('lastname' , $validatedData['lastname']);
        }

        $user->setAttribute('updated_at', now());

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully!',
            'user' => $user, // Vrátime aktuálne údaje používateľa
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user(); // Získa aktuálneho autentifikovaného používateľa

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validácia nového hesla
        $validatedData = $request->validate([
            'current_password' => 'required',
            'new_password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Overenie aktuálneho hesla
        if (!Hash::check($validatedData['current_password'], $user->getAttribute('password'))) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        // Aktualizácia hesla
        $user->setAttribute('password', Hash::make($validatedData['new_password']));
        $user->save();

        return response()->json(['message' => 'Password changed successfully!']);
    }
}
