<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('employees', 'email')->ignore($this->id, 'id'),
            ],
            'phone' => [
                'required',
                'numeric',
                Rule::unique('employees', 'phone')->ignore($this->id, 'id'),
            ],
            'monthly_base_salary' => 'required|numeric|min:0',
        ];
    }
}
