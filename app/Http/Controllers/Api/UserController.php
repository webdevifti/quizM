<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\PasswordUpdateRequest;
use App\Http\Requests\Api\profileUpdateRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{

    public function register(RegisterRequest $request)
    {

        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $request->password,
                'role' => 'performer'
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'register' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token
                ],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'register' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'register' => false,
                'errors' => $e->getMessage()
            ], 500);
        }
    }
    public function login(LoginRequest $request)
    {
        try {
            if (!Auth::attempt($request->only(['username', 'password']))) {
                return response()->json([
                    'login' => false,
                    'error' => 'Username or password incorrect.'
                ], 401);
            }
            $user = User::where('username', $request->username)->first();

            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'login' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token
                ],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'login' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'login' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'logout' => true,
        ], 200);
    }

    public function profile($user_id)
    {
        try {
            $user =  User::findOrFail($user_id);
            return response()->json([
                'profile' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function profileUpdate(profileUpdateRequest $request,$user_id)
    {
       
        try {
            $user = User::findOrFail($user_id);
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->save();
    
            return response()->json([
                'profile' => $user
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }
        catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function passwordUpdate(PasswordUpdateRequest $request,$user_id){
        try{
            $user = User::findOrFail($user_id);
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'password_incorrect' => 'The current password is incorrect.'
                ]);
            }
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json([
                'password' => true
            ]);
        }catch(ValidationException $e){
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
       
    }
}
