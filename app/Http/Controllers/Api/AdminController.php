<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizSubmittion;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(){
        $quiz = Quiz::count();
        $user = User::where('role','performer')->count();
        $top_performer = QuizSubmittion::with(['user'])
        ->select('user_id')
        ->selectRaw('SUM(score) as total_score')
        ->groupBy('user_id')
        ->orderBy('total_score', 'desc')
        ->first();
        return response()->json([
            'dashboard' => [
                'quiz_count' => $quiz,
                'performer_count' => $user,
                'top_performer' => $top_performer
            ]
        ]);
    }
}
