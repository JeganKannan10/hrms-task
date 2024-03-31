
@extends('layout.app')
@section('content')
<div class="layout-px-spacing layout-top-spacing">
    <div class="widget widget-table-three mb-3">
         <div class="row">
             <div class=" col-lg-12 col-sm-12 mb-3">
                <div class="row">
                    <div class="col-lg-12 mb-4">
                        <div class="heading">
                            <h4>Welcome To The {{ auth()->user()->role == 1 ? 'Admin HR' : 'Super Admin' }} Dashboard</h4>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-4">
                        <div class="heading">
                            <h5>Welcome {{ auth()->user()->name }} {{ auth()->user()->role == 1 ? 'HR' : 'Super Admin' }}</h5>
                        </div>
                    </div>
                </div>
             </div>
         </div>
     </div>
 </div>
@endsection