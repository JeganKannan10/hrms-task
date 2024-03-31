<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'employees';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'name', 'email', 'phone', 'status', 'monthly_base_salary'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function EmployeeAttendance()
    {
        return $this->hasMany('App\Models\EmployeeAttendance', 'employee_id', 'id');
    }
}
