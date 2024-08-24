<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class profileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user_id = $this->route('user_id');
        return [
            'name' => 'required|string|max:255',
            'username' => [
                'required',
                'max:255',
                Rule::unique('users', 'username')->ignore($user_id),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user_id),
            ],
        ];
    }
}
