<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'firstname' => 'required|max:255', // Use a pipe `|` to separate rules
            'lastname' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        // Check if the email already exists
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'The email address is already registered. Please use a different one.',
            ], 409); // 409 Conflict HTTP status code
    }




        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

         // Assign default role "student" in the user_has_role table
        DB::table('user_has_role')->insert([
            'user_iduser' => $user->iduser,
            'role_idrole' => 1, // Assuming 1 corresponds to the 'student' role in the role table
        ]);
        $token = $user->createToken($request->email);

        
        //$user->assignRole($request->role);
        return [
            'user' => $user,
            'token' => $token->plainTextToken,
            'message' => 'Registration successful. Default role: Student.'
        ];
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(["message" => "The provided credentials are incorrect."], 404);
        }

        // Fetch user roles from the database
        $roles = DB::table('user_has_role')
        ->join('role', 'user_has_role.role_idrole', '=', 'role.idrole')
        ->where('user_has_role.user_iduser', $user->iduser) // Correct column name
        ->pluck('role.role_name'); // Fetch role names only
        $token = $user->createToken($user->email);

        return [
            'user' => $user,
            'roles' => $roles,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return ["message"=>"You are looged out."];
    }
}
