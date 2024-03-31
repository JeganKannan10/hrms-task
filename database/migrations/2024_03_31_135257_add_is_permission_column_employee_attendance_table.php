<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employee_attendance', function (Blueprint $table) {
            if (!Schema::hasColumn('employee_attendance', 'is_permission')) {
                $table->integer('is_permission')->after('status')->comment('1 = Permission, 0 = No Permission')->default(0);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_attendance', function (Blueprint $table) {
            if (Schema::hasColumn('employee_attendance', 'is_permission')) {
                $table->dropColumn('is_permission');
            }
        });
    }
};
