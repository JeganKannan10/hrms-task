@extends('layout.app')
@section('content')
<div class="layout-px-spacing">
    <div class="row layout-top-spacing" id="cancel-row">
        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div class="widget-content widget-content-area br-6">
                <div class="widget-heading d-flex align-items-center justify-content-between mb-4">
                    <h4>{{ isset($employee) ? 'Edit Employee' : 'Add Employee' }}</h4>
                </div>
                <form  action="{{ route('employee.store') }}" method="post" id="employee-store">
                    @csrf
                    <div class="form-group">
                        <div class="form-row mb-8">
                            <div class="col">
                                <label for="employeeName">
                                    Name <span class="text-danger">*</span>
                                </label>
                                <input type="text" name="name" class="form-control"
                                    placeholder="Employee Name" id="employeeName"
                                    value="{{ old('name',$employee->name ?? '') }}" required>

                                <input type="hidden" name="id" value="{{ $employee->id ?? '' }}">
                                @if ($errors->has('name'))
                                    <p class="text-danger mt-3">{{ $errors->first('name') }}</p>
                                @endif
                            </div>
                            <div class="col">
                                <label for="categoryName">
                                    Email <span class="text-danger">*</span>
                                </label>
                                <input type="email" name="email" class="form-control"
                                    placeholder="email" id="email"
                                    value="{{ old('email',$employee->email ?? '') }}" required>

                                @if ($errors->has('email'))
                                    <p class="text-danger mt-3">{{ $errors->first('email') }}</p>
                                @endif
                            </div>
                        </div>
                        <br>
                        <div class="form-row mb-8">
                            <div class="col">
                                <label for="phoneName">
                                    Phone Number <span class="text-danger">*</span>
                                </label>
                                <input type="number" name="phone" class="form-control"
                                    placeholder="Phone Name" id="phone"
                                    value="{{ old('phone',$employee->phone ?? '') }}" required>

                                @if ($errors->has('phone'))
                                    <p class="text-danger mt-3">{{ $errors->first('phone') }}</p>
                                @endif
                            </div>
                            <div class="col">
                                <label for="monthlyBaseSalary">
                                    Monthly Base Salary (In Ruppes) <span class="text-danger">*</span>
                                </label>
                                <input type="number" name="monthly_base_salary" class="form-control"
                                    placeholder="Monthly Base Salary" id="monthly_base_salary"
                                    value="{{ old('monthly_base_salary',$employee->monthly_base_salary ?? '') }}" required>

                                @if ($errors->has('monthly_base_salary'))
                                    <p class="text-danger mt-3">{{ $errors->first('monthly_base_salary') }}</p>
                                @endif
                            </div>
                        </div>
                        <div class="col-sm-12 text-right pt-2">
                            <a href="{{route('employee.index')}}" class="mt-4 btn btn-outline-danger">Cancel</a>
                            <input type="submit" class="mt-4 btn btn-primary">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection