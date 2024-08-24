<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizSubmittion;
use App\Models\UserAnswer;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FrontController extends Controller
{
    //

    public function getQuizes($user_id)
    {
        $quizes = Quiz::with(['questions'])->get();
        foreach ($quizes as $quiz) {
            $quiz->user_score = QuizSubmittion::where('user_id', $user_id)->where('quiz_id', $quiz->id)->value('score');
        }

        return response()->json([
            'quizes' => $quizes
        ]);
    }

    public function quiz($id, $userID)
    {

        $check_exists = QuizSubmittion::where('quiz_id', $id)->where('user_id', $userID)->first();
        if ($check_exists) {
            return response()->json([
                'quizes' => [
                    'exists' => true,
                    'score' => $check_exists->score
                ]
            ]);
        } else {
            $quiz = Quiz::with(['questions.options'])->where('id', $id)->first();
            return response()->json([
                'quizes' => $quiz,
            ]);
        }
    }

    public function submitQuiz(Request $request)
    {
        try {
            DB::beginTransaction();
            $quizId = $request->quiz_id;
            $quiz = Quiz::with('questions.options')->findOrFail($quizId);
            $score = 0;
            $user  = $request->user_id;
            $submission = QuizSubmittion::create([
                'quiz_id' => $quizId,
                'user_id' => $user,
            ]);
            foreach ($request->answers as $answer) {
                $question = $quiz->questions->find($answer['question_id']);
                $optionIds = (array) $answer['option_ids'];
                $correctSelected = 0;
                $incorrectSelected = 0;

                foreach ($optionIds as $optionId) {
                    $selectedOption = $question->options->find($optionId);
                    $isCorrect = $selectedOption ? $selectedOption->is_correct : false;

                    UserAnswer::create([
                        'submission_id' => $submission->id,
                        'question_id' => $answer['question_id'],
                        'option_id' => $optionId,
                        'is_correct' => $isCorrect,
                    ]);

                    if ($isCorrect) {
                        $correctSelected++;
                    } else {
                        $incorrectSelected++;
                    }
                }

                if ($question->type == 'single_choice') {
                    if ($correctSelected === 1 && $incorrectSelected === 0) {
                        $score++;
                    }
                } elseif ($question->type == 'multiple_choice') {
                    $totalCorrectOptions = $question->options->where('is_correct', true)->count();

                    if ($correctSelected === $totalCorrectOptions && $incorrectSelected === 0) {
                        $score++;
                    }
                }
            }

            $submission->score = $score;
            $submission->save();


            DB::commit();
            return response()->json([
                'quizes' => [
                    'exists' => true,
                    'score' => $score,
                ]

            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function leaderboards()
    {
        try {
            $leaderboards = QuizSubmittion::with(['user', 'quizzes'])
                ->select('user_id')
                ->selectRaw('SUM(score) as total_score')
                ->groupBy('user_id')
                ->orderBy('total_score', 'desc')
                ->limit(20)
                ->get();
            return response()->json([
                'leaderboards' => $leaderboards,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
