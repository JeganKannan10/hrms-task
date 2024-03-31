<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeStoreRequest;
use App\Models\Employee;
use App\Models\EmployeeAttendance;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    /**
     * Retrieves the list of employees and renders the employee-list view.
     *
     * @return \Illuminate\View\View the employee-list view
     */
    public function index()
    {
        try {
            $employees = Employee::all();
            return view('employee.index',compact('employees'));
        } catch (\Exception $e) {
            Log::error('EmployeeController@index', [$e->getMessage()]);
        }
    }

    /**
     * Create a new employee.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        try {
            return view('employee.create');
        } catch (\Exception $e) {
            Log::error('EmployeeController@create', [$e->getMessage()]);
        }
    }

    /**
     * Stores the employee in the database.
     *
     * @param EmployeeStoreRequest $request the request object containing the employee data
     *
     * @return \Illuminate\Http\RedirectResponse a redirect response to the employee index page with a success message
     */
    public function store(EmployeeStoreRequest $request)
    {
        try {
            $employee = Employee::find($request->id);
            if(isset($employee)) {
                $employee->update($request->validated());
            }else {
                Employee::create($request->validated());
            }

            return to_route('employee.index')->with('success', 'Employee saved successfully');
        } catch (\Exception $e) {
            Log::error('EmployeeController@store', [$e->getMessage()]);
        }
    }

    /**
     * Edit a employee.
     *
     * @param Employee $employee the employee to be edited
     *
     * @return Illuminate\View\View the view for editing a employee
     */
    public function edit(Employee $employee)
    {
        try {
            return view('employee.create', compact('employee'));
        } catch (\Exception $e) {
            Log::error('EmployeeController@edit', [$e->getMessage()]);
        }
    }

    /**
     * Deletes a employee object.
     *
     * @param Employee $employee the employee object to be deleted
     *
     * @return RedirectResponse The redirect response to the 'employee.index' route with a success message.
     */
    public function destroy(Employee $employee)
    {
        try {
            $employee->delete();

            return to_route('employee.index')->with('success', 'Employee deleted successfully');
        } catch (\Exception $e) {
            Log::error('EmployeeController@destroy', [$e->getMessage()]);
        }
    }

    /**
     * Retrieves a list of salary based on the given employee ID.
     *
     * @param $employeeId the ID of the employee
     *
     * @return JsonResponse the JSON response containing the list of employee salaries
     */
    public function salaryList($employeeId)
    {
        try {
            $employee = Employee::where('id', $employeeId)->first();

            // Static Monthly Working Days = 24
            $monthlyWorkingDays = 24;
            $dailySalaryAmount = ($employee->monthly_base_salary / $monthlyWorkingDays);

            $employeeAttendance = EmployeeAttendance::where('employee_id', $employeeId)
                        ->select(
                            DB::raw('YEAR(date) as year'),
                            DB::raw('MONTH(date) as month'),
                            DB::raw('COUNT(*) as count'),
                            DB::raw('SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as present_count'), // present count
                            DB::raw('SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as leave_count'), // leave count
                            DB::raw('SUM(CASE WHEN is_permission = 1 THEN 1 ELSE 0 END) as permission_count'), // permission count
                            DB::raw('(SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END)
                                        - CASE WHEN SUM(CASE WHEN is_permission = 1 THEN 1 ELSE 0 END) > 3
                                        THEN ((SUM(CASE WHEN is_permission = 1 THEN 1 ELSE 0 END) - 3) / 2) ELSE 0 END)
                                        * ' . $dailySalaryAmount . ' AS salary'
                                    ) // Calculate salary
                        )
                        ->groupBy(DB::raw('YEAR(date), MONTH(date)'))
                        ->get();

            return view('employee.salary', compact('employeeAttendance','employee','dailySalaryAmount'));
        } catch (\Exception $e) {
            Log::error('EmployeeController@salaryList', [$e->getMessage()]);
        }
    }
}
