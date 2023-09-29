<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (($request->header('AppKey') !== env('MOBILE_APP_KEY')) && ($request->header('AppVersion') !== env('MOBILE_APP_VER'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unsupported AppKey and AppVersion, try again or contact administrator!'
            ], 422);
        }

        return $next($request);
    }
}
