<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EventController extends Controller
{
    public function store(Request $request)
    {
        // Validácia údajov
        $validatedData = $request->validate([
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_upload_EndDate' => 'required|date',
        ]);

        // Vytvorenie novej udalosti
        $event = Event::create([
            'event_name' => $validatedData['event_name'],
            'event_date' => Carbon::parse($validatedData['event_date']),
            'event_upload_EndDate' => Carbon::parse($validatedData['event_upload_EndDate']),
            'created_on' => Carbon::now(),
            'modified_on' => Carbon::now(),
        ]);

        return response()->json([
            'message' => 'Událosť bola úspešne vytvorená.',
            'event' => $event,
        ], 201);
    }
}
