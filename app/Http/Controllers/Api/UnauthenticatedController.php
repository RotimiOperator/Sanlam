<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Otp;
use App\Notifications\SendMail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\HtmlString;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class UnauthenticatedController extends Controller
{
    /**
    * Instantiate a new controller instance.
    *
    * @return void
    */
    public function __construct()
    {
        //
    }


    /**
     * .
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function unAuthenticated(Request $request)
    {
        try {
            return [];
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
    public function otp(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
        ]);


        try {
            $Otp = Otp::updateOrCreate(
                ['id' => $request->email],
                ['expired_at' => now()->addMinutes(2)]
            );

            if($request->email) {
                try {
                    Notification::route('mail', [
                        $request->email => $request->name ?? $request->email,
                    ])->notify(new SendMail(
                        "OTP Verification Code",
                        new HtmlString("
                            <h3>Sanlam!</h3>
                            <p>Hello,</p>
                            <p>This is your 4-digit OTP (One Time Password) for mobile app use.</p>
                            <h1>{$Otp->code}</h1>
                            <p>Enter this 4-digit OTP (One Time Password) by typing the OTP in the field provided on the form before continuing.</p>
                            <p>Please do not share this verification code with anyone.</p>
                            <p>This email was sent to <a href='mailto:{$request->email}'>{$request->email}</a></p>
                        ")
                    ));
                } catch (\Exception $e) {
                    //return $e->getMessage();
                }
            }

            return [
                'status' => 'success',
                'message' => 'OTP sent successfully'
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
    public function otpVerify(Request $request, $action = null)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
            'otp' => 'required|numeric|digits:4',
        ], [
            'otp.required' => 'Please enter the OTP Code you received.',
        ]);

        try{
            if($action == 'reVerify') {
                $revalidateOtp = Otp::where('id', $request->email)->where('code', $request->otp)->first();
                if(!$revalidateOtp) {
                    return [
                        'status' => 'error',
                        'message' => 'OTP is not correct, please restart the process again!'
                    ];
                };
                $revalidateOtp->delete();
            } else {
                $Otp_Gen = Otp::where('id', $request->email)->first();
                $Otp = Otp::where('id', $request->email)->where('code', $request->otp)->first();
    
                if(!$Otp_Gen) {
                    $this->otp($request);
                    return [
                        'status' => 'error',
                        'message' => 'OTP not found. A new OTP has been sent successfully!'
                    ];
                } elseif(!$Otp) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'OTP is not correct. Please enter the last OTP Code you received!'
                    ], 422);
                } elseif($Otp->expired_at < now()) {
                    $this->otp($request);
                    return response()->json([
                        'status' => 'error',
                        'message' => 'OTP has expired. A new OTP has been sent! Please enter the new OTP Code you received!'
                    ], 422);
                }
    
                //$Otp->delete();
                return [
                    'status' => 'success',
                    'message' => 'OTP verified successfully!'
                ];
            }
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
    public function register(Request $request)
    {
        $request->validate([
            'email' => $roleExist ? 'required|string|email|max:255|unique:users' : 'required|string|email|max:255',
            'otp' => 'nullable|numeric|digits_between:1,4',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()->numbers()->symbols()->mixedCase()],
            'device_name' => 'required',
        ]);
            
        if(!$request->otp) return $this->otp($request);
        elseif(!$request->password) {
            $otpVerify = $this->otpVerify($request);
            if($otpVerify) return $otpVerify;
        }

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()->numbers()->symbols()->mixedCase()],
        ]);

        $otpReVerify = $this->otpVerify($request, $action = 'reVerify');
        if($otpReVerify) return $otpReVerify;

        try{
            $user = User::updateOrCreate(
                ['email' => $request->email],
                ['password' => Hash::make($request->password)]
            );

            event(new Registered($user));

            Auth::login($user);

            Auth::user()->update(['last_login_at' => now()]);
            
            return [
                'status' => 'success',
                'token' => $user->createToken($request->device_name)->plainTextToken,
                'user' => Auth::user(),
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
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        try{
            $userFieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
            
            $user = User::where($userFieldType, $request->username)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'The provided username or password is incorrect!'
                ], 422);
            }

            if (! \Auth::attempt([$userFieldType => $request->username, 'password' => $request->password, 'status' => 1])) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'This account is disabled!'
                ], 422);
            }

            $user->update([
                'last_login_at' => now()
            ]);
        
            return [
                'status' => 'success',
                'token' => $user->createToken($request->device_name)->plainTextToken,
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
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'otp' => 'nullable|numeric|digits_between:1,4',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()->numbers()->symbols()->mixedCase()],
            'device_name' => 'required',
        ]);

        $userFieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        
        $user = User::where($userFieldType, $request->username)->first();

        if (! $user ) {
            return response()->json([
                'status' => 'error',
                'message' => 'The provided username is incorrect!'
            ], 422);
        }

        if (! $user->status ) {
            return response()->json([
                'status' => 'error',
                'message' => 'This account is disabled!'
            ], 422);
        }

        $request->merge(['email' => $user->email]);
        
        if(!$request->otp) return $this->otp($request);
        elseif(!$request->password) {
            $otpVerify = $this->otpVerify($request);
            if($otpVerify) return $otpVerify;
        }

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()->numbers()->symbols()->mixedCase()],
        ]);

        $otpReVerify = $this->otpVerify($request, $action = 'reVerify');
        if($otpReVerify) return $otpReVerify;

        try{
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        
            return [
                'status' => 'success',
                'message' => 'Password reset was successful!',
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
