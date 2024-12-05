<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            'categories' => 'nullable|array', // Validate categories as an array
            'categories.*' => 'required|string|max:255', // Validate each category as a string
        ]);

        try {
            // Vytvorenie novej udalosti
            $event = Event::create([
                'event_name' => $validatedData['event_name'],
                'event_date' => Carbon::parse($validatedData['event_date']),
                'event_upload_EndDate' => Carbon::parse($validatedData['event_upload_EndDate']),
                'created_on' => Carbon::now(),
                'modified_on' => Carbon::now(),
            ]);

            // Vytvorenie kategórií pre udalosť
            if (!empty($validatedData['categories'])) {
                foreach ($validatedData['categories'] as $categoryName) {
                    Category::create([
                        'category_name' => $categoryName,
                        'event_id' => $event->idevent, // Associate category with the created event
                        'created_on' => Carbon::now(),
                        'modified_on' => Carbon::now()
                    ]);
                }
            }

            return response()->json([
                'message' => 'Udalosť a kategórie boli úspešne vytvorené.',
                'event' => $event,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Pri vytváraní udalosti došlo k chybe.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function allEvents()
    {
        try {
            // Získajte všetky udalosti z databázy
            $events = Event::all();

            // Vráťte úspešnú odpoveď vo formáte JSON
            return response()->json([
                'success' => true,
                'data' => $events
            ], 200);

        } catch (\Exception $e) {
            // Ošetrenie chyby a návrat chybovej odpovede
            return response()->json([
                'success' => false,
                'message' => 'Nepodarilo sa načítať udalosti.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
