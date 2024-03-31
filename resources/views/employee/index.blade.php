@extends('layout.app')
@section('content')
<div class="layout-px-spacing">
    <div class="row layout-top-spacing" id="cancel-row">
        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-6">
                <div class="widget-heading d-flex align-items-center justify-content-between">
                    <h5 class="">Employees List</h5>
                    <a class="btn btn-primary" href="{{ route('employee.create') }}">Add Employee</a>
                </div>
                <div class="table-responsive mb-4 mt-4">
                    <table id="employee_table_pagination" class="table table-hover" style="width:100%">
                        
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Employee Name</th>
                                    <th>Employee Email</th>
                                    <th>Employee Phone Number</th>
                                    <th>Employee Monthly Base Salary</th>
                                    <th>View Employee Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($employees as $employee)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $employee->name }}</td>
                                        <td>{{ $employee->email }}</td>
                                        <td>{{ $employee->phone }}</td>
                                        <td>{{ $employee->monthly_base_salary }}</td>
                                        <td><a class="btn btn-primary" href="{{ route('employee.salary-list', $employee) }}">View Employee Salary</a></td>
                                        <td>
                                            <div class="organize">
                                                <div>
                                                    <a href="{{ route('employee.edit', $employee) }}">
                                                        <img src="{{ asset('assets/img/edit.svg') }}" alt="Edit">
                                                    </a>
                                                </div>
                                                @if(auth()->user()->role == 2)
                                                    <div>
                                                        <form action="{{ route('employee.destroy', $employee) }}" method="post"
                                                            onsubmit="return confirm('Are you sure you want to delete?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit"
                                                                style="background: none; border: none; padding: 0;">
                                                                <img src="{{ asset('assets/img/delete.svg') }}" alt="Delete">
                                                            </button>
                                                        </form>
                                                    </div>
                                                @endif
                                            </div>
                                        </td>
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