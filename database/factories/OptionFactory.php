<?php

namespace Database\Factories;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Option>
 */
class OptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Option::class;

    public function definition(): array
    {
        return [
            'option_text' => $this->faker->word(),
            'is_correct' => false,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Option $option) {
            $question = $option->question;

           
            if (!$question->options()->where('is_correct', true)->exists()) {
                $option->update(['is_correct' => true]);
            }
            if ($question->type === 'multiple_choice') {
                $correctOptions = $question->options->filter(function ($opt) {
                    return $opt->is_correct;
                });

                if ($correctOptions->count() < 2) {
                    $question->options->random()->update(['is_correct' => true]);
                }
            }
        });
    }
}
