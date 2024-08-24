<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\PerformerController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/profile/{user_id}', [UserController::class, 'profile']);
    Route::post('/profile/update/{user_id}', [UserController::class, 'profileUpdate']);
    Route::post('/profile/update/password/{user_id}', [UserController::class, 'passwordUpdate']);
    Route::resource('/performers', PerformerController::class);
    Route::resource('/quizes', QuizController::class);
    Route::get('quizes/analyz/quiz/{id}',[QuizController::class, 'quizAnalyz']);
    Route::get('/get/quizes/{user_id}',[FrontController::class, 'getQuizes']);
    Route::get('/get/quiz/{id}/{userID}',[FrontController::class, 'quiz']);
    Route::post('/submit/quiz',[FrontController::class, 'submitQuiz']);
    Route::get('/get/leaderboards',[FrontController::class, 'leaderboards']);
    Route::get('/get/dashboard/data',[AdminController::class, 'dashboard']);
});
