<?php

namespace App\Http\Controllers\Auth;

/*use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;*/

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

use App\User;
use Hash;

class LoginController extends Controller
{    
    protected function login(Request $request)
    {
        $credentials = $request->json()->all();
        $validator = Validator::make(request()->all(), [
            'email'=>'required|email|exists:users,email',
            'password'=>'required|min:6',
        ]);

        if(count($validator->errors()) > 0){
            return response()->json($validator->errors(), 422);
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['password' => 'invalid data'], 422);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json( compact('token') );
    }

}
