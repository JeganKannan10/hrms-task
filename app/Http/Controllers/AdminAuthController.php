<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAuthLoginRequest;
use App\Http\Requests\AdminAuthRegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminAuthController extends Controller
{
    protected $guardName = 'web';

    /**
     * Goto Register view page.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getRegister()
    {
        try {
            return view('register');
        } catch (\Exception $e) {
            Log::error('AdminAuthController@getRegister', [$e->getMessage()]);
        }
    }

    /**
     * Goto Login view page.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getLogin()
    {
        try {
            return view('login');
        } catch (\Exception $e) {
            Log::error('AdminAuthController@getLogin', [$e->getMessage()]);
        }
    }

    /**
     * A method to handle the register functionality for the admin or super admin.
     *
     * @param AdminAuthRegisterRequest $request the request object containing the login credentials
     *
     * @return RedirectResponse Returns a redirect response to the admin dashboard if the register is successful.
     *                          Otherwise, it returns a redirect response to the regsuter page with the input values
     *                          and an error message.
     */
    public function postRegister(AdminAuthRegisterRequest $request)
    {
        try {
            User::create($request->validated());
            Auth::attempt(['email' => $request->email, 'password' => $request->password]);
            return to_route('dashboard');
        } catch (\Exception $e) {
            Log::error('AdminAuthController@postRegister', [$e->getMessage()]);
        }
    }

    /**
     * A method to handle the Login functionality for the admin or super admin.
     *
     * @param AdminAuthLoginRequest $request the request object containing the login credentials
     *
     * @return RedirectResponse Returns a redirect response to the admin dashboard if the login is successful.
     *                          Otherwise, it returns a redirect response to the regsuter page with the input values
     *                          and an error message.
     */
    public function postLogin(AdminAuthLoginRequest $request)
    {
        try {
            if (Auth::guard($this->guardName)->attempt($request->validated())) {
                return to_route('dashboard');
            }

            return back()->withInput()->withErrors(['Incorrect login details!']);
        } catch (\Exception $e) {
            Log::error('AdminAuthController@postLogin', [$e->getMessage()]);
        }
    }

    /**
     * Logout form auth and redirect to login page.
     *
     * @return \Illuminate\Contracts\Foundation\Application|
     * \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function postLogout()
    {
        try {
            Auth::guard('web')->logout();

            return to_route('login-view');
        } catch (\Exception $e) {
            Log::error('AdminAuthController@postLogout', [$e->getMessage()]);
        }
    }

    /**
     * Goto dashboard view page.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard()
    {
        try {
            return view('dashboard');
        } catch (\Exception $e) {
            Log::error('AdminAuthController@dashboard', [$e->getMessage()]);
        }
    }
}
