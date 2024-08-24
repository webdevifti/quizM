<?php

use Illuminate\Support\Facades\Route;

Route::get('{pathMatch}', function(){
    return view('welcome');
})->where('pathMatch',".*");
