<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function getRoles()
    {
        // Získať všetky záznamy z tabuľky roles
        $roles = Role::all();

        // Skontrolovať, či existujú nejaké dáta
        if ($roles->isEmpty()) {
            return response()->json(['message' => 'No roles found'], 404);
        }

        // Vrátiť dáta vo formáte JSON
        return response()->json($roles, 200);
    }
}
