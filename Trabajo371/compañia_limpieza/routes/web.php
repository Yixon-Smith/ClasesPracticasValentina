<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });
// 
Auth::routes();
Route::get('/', [App\Http\Controllers\HomeController::class, 'login']);
Route::middleware(['auth', 'verified'])->group(function () {

Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);
Route::get('/productos', [App\Http\Controllers\ProductoController::class, 'index'])->name('productos.index');

Route::get('/productos/registro', [App\Http\Controllers\ProductoController::class, 'create'])->name('productos.create');

// Route::pus('/productos/registro', [App\Http\Controllers\ProductoController::class, 'index'])->name('productos.index');

// Route::destroy('/productos/registro', [App\Http\Controllers\ProductoController::class, 'index'])->name('productos.index');
 });

