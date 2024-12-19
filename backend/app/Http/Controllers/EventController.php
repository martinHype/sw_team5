<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use App\Models\User;
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

    public function getAdminEvents(Request $request)
    {
        try {
            // Start building the query
            $query = Event::query();

            // Filter by the exact date if provided
            if ($request->filled('date')) {
                $query->whereDate('event_date', $request->date);
            }

            if ($request->filled('name')) {
                $query->where('event_name', 'like', '%' . $request->name . '%');
            }

            // Execute the query and fetch the events
            $events = $query->get();

            // Return a successful JSON response
            return response()->json([
                'success' => true,
                'data' => $events,
            ], 200);
        } catch (\Throwable $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'success' => false,
                'message' => 'Nepodarilo sa načítať udalosti.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getAdminEventDetail($id)
    {
        try {
            // Fetch the conference by ID
            $conference = Event::find($id);

            // Check if the conference exists
            if (!$conference) {
                return response()->json([
                    'success' => false,
                    'message' => 'Konferencia nebola nájdená.',
                ], 404);
            }

            // Return the conference details
            return response()->json([
                'success' => true,
                'data' => $conference,
            ], 200);

        } catch (\Throwable $e) {
            // Handle exceptions
            return response()->json([
                'success' => false,
                'message' => 'Nepodarilo sa načítať detaily konferencie.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getAdminEventUsers($id)
    {

        //TODO Neberie do uvahy ci je prihlaseny na konferenciu iba ci ma rolu. ak má hned to vyhodi na vserkych konf

        // Načítanie používateľov a ich rolí pre konkrétnu konferenciu
        $users = User::with(['roles' => function ($query) use ($id) {
            $query->wherePivot('conference_id', $id); // Filter podľa conference_id v pivot tabuľke
        }])->get();

        // Skontrolovať, či boli nájdení nejakí používatelia
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found for this conference'], 404);
        }

        // Vrátiť výsledky vo formáte JSON
        return response()->json($users, 200);
    }
    public function assignRole(Request $request, $id)
    {
        // Overenie vstupov
        $validatedData = $request->validate([
            'role' => 'required|exists:role,idrole',
            'conference' => 'required|exists:event,idevent',
        ]);

        $user = User::findOrFail($id);

        $roleId = $validatedData['role'];
        $conference = $validatedData['conference'];

        $user->roles()->attach($roleId, ['conference_id' => $conference]);

        return response()->json([
            'message' => 'Rola bola úspešne priradená používateľovi.',
            'userId' => $user->id,
            'roleId' => $roleId,
            'conferenceId' => $conference,
        ], 200);
    }

}
