<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Option;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Question::class;

    public function definition(): array
    {
        return [
            'question_text' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['single_choice', 'multiple_choice']),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Question $question) {
            Option::factory()->count(4)->create(['question_id' => $question->id]);
        });
    }
}
