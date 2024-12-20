<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index(){
        $events = Event::with('articles')->get(); // Load related articles
        return response()->json($events);
    }

    public function getEvents()
    {
        $user = Auth::user();

        // Fetch user's roles
        $roles = DB::table('user_has_role')
            ->join('role', 'user_has_role.role_idrole', '=', 'role.idrole')
            ->where('user_has_role.user_iduser', $user->iduser)
            ->pluck('role.role_name')
            ->toArray();

        // Query to include status name and category name
        if (in_array('admin', $roles)) {
            $events = Event::with(['articles' => function ($query) {
                $query->select(
                    'article.*',
                    'acticle_status.acticle_status_name',
                    'category.category_name'
                )
                ->leftJoin('acticle_status', 'article.acticle_status_idacticle_status', '=', 'acticle_status.idacticle_status')
                ->leftJoin('category', 'article.category_idcategory', '=', 'category.idcategory');
            }])->get();
        } else {
            $events = Event::with(['articles' => function ($query) use ($user, $roles) {
                $query->select(
                    'article.*',
                    'acticle_status.acticle_status_name',
                    'category.category_name'
                )
                ->leftJoin('acticle_status', 'article.acticle_status_idacticle_status', '=', 'acticle_status.idacticle_status')
                ->leftJoin('category', 'article.category_idcategory', '=', 'category.idcategory')
                ->where(function ($q) use ($user, $roles) {
                    if (in_array('student', $roles)) {
                        $q->orWhere('article.user_iduser', $user->iduser);
                    }
                    if (in_array('reviewer', $roles)) {
                        $q->orWhere('article.idreviewer', $user->iduser);
                    }
                });
            }])->get();
        }

        return response()->json($events);
    }


    public function showArticles($id){
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        return response()->json($event->articles);
    }
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
}
