<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'today' => Auth::user()->transactions()->whereDate('created_at', today())->sum('amount'),
                'assets' => Auth::user()->assets()->sum('amount'),
                'transactions' => Auth::user()->transactions()->sum('amount'),
            ],
            'assets' => Auth::user()->assets,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Asset/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Auth::user()->assets()->create([
            'name' => $request->name
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Inertia::render('Asset/Show', [
            'asset' => Auth::user()->assets()->with('transactions')->findOrFail($id),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asset $asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $asset = Auth::user()->assets()->findOrFail($id);
        
        if($request->type == 'Debit') {
            $asset->decrement('amount', $request->amount);
        } else {
            $asset->increment('amount', $request->amount);
        }
        
        Auth::user()->transactions()->create([
            'asset_id' => $asset->id,
            'currency' => 'NGN',
            'amount' => $request->amount,
            'type' => $request->type,
            'method' => $request->method,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        //
    }
}
