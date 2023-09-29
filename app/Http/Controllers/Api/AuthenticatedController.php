<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Asset;
use App\Models\Transaction;
use App\Notifications\SendMail;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Notification;

class AuthenticatedController extends Controller
{

    /**
    * Instantiate a new controller instance.
    *
    * @return void
    */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            $this->assets = Auth::user()->assets()->latest();
            $this->transactions = Auth::user()->transactions()->latest();
            return $next($request);
        });
    }

    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function authenticated(Request $request)
    {
        try {
            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'user' => [
                    'stats' => [
                        'today' => Auth::user()->transactions()->whereDate('created_at', today())->sum('amount'),
                        'assets' => Auth::user()->assets()->sum('amount'),
                        'transactions' => Auth::user()->transactions()->sum('amount'),
                    ],
                    'user' => Auth::user(),
                    'assets' => Auth::user()->assets()->latest(),
                    'transactions' => Auth::user()->transactions()->latest(),
                ]
            ];
        } catch (\Exception $e) {
            //return $e->getMessage();
            return response()->json([
                'status' => 'error',
                'message' => 'Internal Server Error'
            ], 500);
        }
    }


    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function assets(Request $request, $id = null)
    {
        if ($request->isMethod('get') && ($id === null)) {
            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'assets' => $this->assets,
            ];
        }

        if ($request->isMethod('post')) {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);
        }

        try{
            if ($request->isMethod('post')) {
                $asset = $this->assets()->createOrUpdate([
                    'id' => $id,
                ], [
                    'name' => $request->name,
                ]);
            } else {
                $asset = $this->assets()->find($id);
            }

            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'asset' => $asset
            ];
        } catch (\Exception $e) {
            //return $e->getMessage();
            return response()->json([
                'status' => 'error',
                'message' => 'Internal Server Error'
            ], 500);
        }
    }


    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function transactions(Request $request, $id = null)
    {
        if ($request->isMethod('get') && ($id === null)) {
            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'transactions' => $this->transactions,
            ];
        }

        if ($request->isMethod('post')) {
            $request->validate([
                'asset_id' => 'required|integer',
                'amount' => 'required|integer',
            ]);
        }

        try{
            if ($request->isMethod('post')) {
                $asset = $this->assets()->find($request->asset_id);

                if(!$asset) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'No asset found!'
                    ], 422);
                }

                $transaction = $this->transactions()->create([
                    'asset_id' => $asset->id, 
                    'currency' => 'NGN',
                    'amount' => $request->amount,
                    'description' => '',
                    'type' => $request->type,
                    'method' => $request->method,
                ]);

                if($request->type = 'debit') {
                    $asset->decrement('amount', $request->amount);
                } else {
                    $asset->increment('amount', $request->amount);
                }

            } else {
                $asset = $this->assets()->find($id);
            }

            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'asset' => $asset->with('transactions')
            ];
        } catch (\Exception $e) {
            //return $e->getMessage();
            return response()->json([
                'status' => 'error',
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function statement(Request $request)
    {
        if ($request->isMethod('post')) {
            $request->validate([
                'type' => 'required|integer',
                'id' => 'required_if:type,0|integer',
                'from' => 'required|date',
                'to' => 'required|date',
            ]);
        }

        try{
            if ($request->isMethod('post')) {
                if ($request->type == 0) {
                    //assets
                } else {
                    //transactions
                }
            }

            return [
                'status' => 'success',
                'token' => $request->bearerToken(),
                'user' => $this->user,
            ];
        } catch (\Exception $e) {
            //return $e->getMessage();
            return response()->json([
                'status' => 'error',
                'message' => 'Internal Server Error'
            ], 500);
        }
    }

}
