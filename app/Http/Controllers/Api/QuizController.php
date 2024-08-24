<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Option;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizSubmittion;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizes = Quiz::orderBy('created_at', 'desc')->get();
        return response()->json([
            'quizes' => $quizes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $quiz = Quiz::create([
                'title' => $request->title,
                'description' => $request->description
            ]);
            foreach ($request['questions'] as $q) {
                $question = Question::create([
                    'quiz_id' => $quiz->id,
                    'question_text' => $q['title'],
                    'type' => $q['type']
                ]);

                foreach ($q['options'] as $option) {
                    Option::create([
                        'question_id' => $question->id,
                        'option_text' => $option['text'],
                        'is_correct' =>  $option['isCorrect'],
                    ]);
                }
            }

            DB::commit();
            return response()->json([
                'quizes' => $quiz
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $quiz = Quiz::with(['questions.options'])->where('id', $id)->first();
        return response()->json([
            'quizes' => $quiz,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $quiz = Quiz::with(['questions.options'])->where('id', $id)->first();
        $option_array = [];
        foreach ($quiz->questions as $question) {
            $option_array[] = $question->options;
        }
        return response()->json([
            'quizes' => $quiz,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            DB::beginTransaction();
            $quiz = Quiz::findOrFail($id);
            $quiz->title = $request->formData['title'];
            $quiz->description = $request->formData['description'];
            $quiz->save();
            $existingQuestionIds = Question::where('quiz_id', $quiz->id)->pluck('id')->toArray();
            $formQuestionIds = [];
            $formOptionIds = [];

            foreach ($request->formData['questions'] as $q) {
                if (isset($q['id']) && $q['id']) {
                    $formQuestionIds[] = $q['id'];
                }
                if (isset($q['id']) && $q['id']) {
                    $question = Question::find($q['id']);

                    if ($question) {
                        $question->update([
                            'question_text' => $q['question_text'],
                            'type' => $q['type']
                        ]);
                    } else {
                        $question = Question::create([
                            'quiz_id' => $quiz->id,
                            'question_text' => $q['question_text'],
                            'type' => $q['type']
                        ]);
                    }
                } else {
                    $question = Question::create([
                        'quiz_id' => $quiz->id,
                        'question_text' => $q['question_text'],
                        'type' => $q['type']
                    ]);
                }

                if ($question) {
                    $existingOptionIds = Option::where('question_id', $question->id)->pluck('id')->toArray();
                    foreach ($q['options'] as $o) {
                        if (isset($o['id']) && $o['id']) {
                            $formOptionIds[] = $o['id'];
                            $option = Option::find($o['id']);

                            if ($option) {
                                $option->update([
                                    'option_text' => $o['option_text'],
                                    'is_correct' => $o['is_correct']
                                ]);
                            } else {
                                Option::create([
                                    'question_id' => $question->id,
                                    'option_text' => $o['option_text'],
                                    'is_correct' => $o['is_correct']
                                ]);
                            }
                        } else {
                            $newOption = Option::create([
                                'question_id' => $question->id,
                                'option_text' => $o['option_text'],
                                'is_correct' => $o['is_correct']
                            ]);
                            $formOptionIds[] = $newOption->id;
                        }
                    }
                    $optionsToDelete = array_diff($existingOptionIds, $formOptionIds);
                    if (!empty($optionsToDelete)) {
                        Option::whereIn('id', $optionsToDelete)->delete();
                    }
                }
            }

            $questionsToDelete = array_diff($existingQuestionIds, $formQuestionIds);
            if (!empty($questionsToDelete)) {
                Question::whereIn('id', $questionsToDelete)->delete();
                Option::whereIn('question_id', $questionsToDelete)->delete();
            }

            $questionsToDelete = array_diff($existingQuestionIds, $formQuestionIds);
            if (!empty($questionsToDelete)) {
                Question::whereIn('id', $questionsToDelete)->delete();
                Option::whereIn('question_id', $questionsToDelete)->delete();
            }

            DB::commit();
            $update_quiz = Quiz::with(['questions.options'])->where('id', $id)->first();
            return response()->json([
                'quizes' => $update_quiz
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $item = Quiz::findOrFail($id);
            $item->delete();
            return response()->json([
                'id' => $id
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function quizAnalyz($id){
        try {
            $item = QuizSubmittion::with(['user','quiz'])->where('quiz_id',$id)->get();
            return response()->json([
                'quizes' => $item
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }
    }
}
