<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'firstname' => 'required|max:255', // Use a pipe `|` to separate rules
            'lastname' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);


        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $token = $user->createToken($request->email);

        
        //$user->assignRole($request->role);
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return ["message"=>"The provided credentials are incorrect."];
        }
        $token = $user->createToken($user->email);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return ["message"=>"You are looged out."];
    }
}
