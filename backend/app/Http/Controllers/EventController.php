<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use ZipArchive;

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
            },'articles.keywords:word'])->get();
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
            },'articles.keywords:word'])->get();
        }

        return response()->json($events);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'event_upload_EndDate' => 'required|date',
            'description' => 'nullable|string',
            'password' => 'nullable|string',
        ]);

        // Find the event by ID
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Update event details
        $event->update([
            'event_name' => $validatedData['event_name'],
            'event_date' => $validatedData['event_date'],
            'event_upload_EndDate' => $validatedData['event_upload_EndDate'],
            'description' => $validatedData['description'] ?? null,
            'password' => $validatedData['password'], // Null if not private
        ]);

        return response()->json(['message' => 'Event updated successfully', 'event' => $event]);
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
            'password' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        try {
            // Vytvorenie novej udalosti
            $event = Event::create([
                'event_name' => $validatedData['event_name'],
                'event_date' => Carbon::parse($validatedData['event_date']),
                'event_upload_EndDate' => Carbon::parse($validatedData['event_upload_EndDate']),
                'created_on' => Carbon::now(),
                'modified_on' => Carbon::now(),
                'password' => $validatedData['password'],
                'description' => $validatedData['description'],
            ]);

            return response()->json([
                'message' => 'Konferencia bola vytvorená!',
                'event' => $event, // Celý objekt udalosti
            ]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Pri vytváraní udalosti došlo k chybe.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    //nemýliť si s getAdminEvents
    public function getAdminEvent($id){
        $event = Event::find($id);
        return response()->json($event);
    }
    public function getAdminEvents(Request $request)
    {
        try {
            $query = Event::query();
            if ($request->filled('historical')) {
                // Filtrovanie pre historické udalosti
                $query->where('event_upload_EndDate', '<', now());
            }else {
                if ($request->filled('date') || $request->filled('name')) {
                    if ($request->filled('date')) {
                        $query->whereDate('event_date', $request->date);
                    }

                    if ($request->filled('name')) {
                        $query->where('event_name', 'like', '%' . $request->name . '%');
                    }
                } else {
                    $threeDaysAgo = Carbon::now()->subDays(3)->startOfDay();
                    $query
                        ->where('event_date', '>=', $threeDaysAgo)
                        ->orderBy('created_on', 'desc');
                }
            }
            $events = $query->get();

            return response()->json([
                'success' => true,
                'data' => $events,
            ], 200);

        } catch (\Throwable $e) {
            // Spracovanie výnimiek
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
    public function downloadConference($conference_name){
        $decodedConferenceName = urldecode($conference_name);
        Log::info($decodedConferenceName);
        $path = storage_path("/app/private/uploads/{$decodedConferenceName}");

        Log::info($path);

        if (!file_exists($path)) {
            return response()->json(['message' => 'Conference not found'], 404);
        }

        $zipFileName = "{$decodedConferenceName}_articles.zip";
        $zipPath = storage_path("app/private/{$zipFileName}");

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($path) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }
            $zip->close();
        } else {
            return response()->json(['message' => 'Could not create zip file'], 500);
        }

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }
}
