<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['adminAuth'])->group(function () {
    Route::get('register', [AdminAuthController::class, 'getRegister'])->name('register-view');
    Route::post('register', [AdminAuthController::class, 'postRegister'])->name('register');

    Route::get('login', [AdminAuthController::class, 'getLogin'])->name('login-view');
    Route::post('login', [AdminAuthController::class, 'postLogin'])->name('login');
});


Route::middleware('auth:web')->group(function () {
    Route::get('dashboard', [AdminAuthController::class, 'dashboard'])->name('dashboard');
    Route::get('logout', [AdminAuthController::class, 'postLogout'])->name('logout');
    Route::resource('employee', EmployeeController::class);
    Route::get('employee/salary-list/{employee_id}', [EmployeeController::class, 'salaryList'])->name('employee.salary-list');
});

