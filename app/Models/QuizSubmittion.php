<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizSubmittion extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class, 'user_id','id');
    }
    public function quizzes(){
        return $this->hasManyThrough(Quiz::class, QuizSubmittion::class, 'user_id', 'id', 'user_id', 'quiz_id');
    }
    public function quiz(){
        return $this->belongsTo(Quiz::class, 'quiz_id','id');
    }
}
