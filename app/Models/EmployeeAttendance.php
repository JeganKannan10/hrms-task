<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeAttendance extends Model
{
    use HasFactory;
    protected $table = 'employee_attendance';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'employee_id', 'date', 'start_time', 'end_time' ,'status'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Employee()
    {
        return $this->belongsTo('App\Models\Employee', 'employee_id', 'id');
    }
}
