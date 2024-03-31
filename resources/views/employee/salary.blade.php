@extends('layout.app')
@section('content')
<div class="layout-px-spacing">
    <div class="row layout-top-spacing" id="cancel-row">
        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-6">
                <div class="widget-heading d-flex align-items-center justify-content-between">
                    <h5 class="">Employee Salary List</h5>
                </div>
                <div class="table-responsive mb-4 mt-4">
                    <table id="salary_table_pagination" class="table table-hover" style="width:100%">
                        
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Month Base Salary</th>
                                    <th>Month</th>
                                    <th>Salary</th>
                                    <th>One Day Salary</th>
                                    <th>Total Working Days</th>
                                    <th>present Days</th>
                                    <th>Leave Days</th>
                                    <th>Total Permissions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($employeeAttendance as $attendance)
                                    <tr>
                                        <td>{{ $employee->name }}</td>
                                        <td>{{ $employee->monthly_base_salary }}</td>
                                        <td>{{ $attendance->month }} - {{ $attendance->year }}</td>
                                        <td>{{ number_format($attendance->salary,2) }}</td>
                                        <td>{{ number_format($dailySalaryAmount,2) }}</td>
                                        <td>24</td>
                                        <td>{{ $attendance->present_count }}</td>
                                        <td>{{ $attendance->leave_count }}</td>
                                        <td>{{ $attendance->permission_count }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('assets/js/showdatatable.js')}}"></script>
@endsection