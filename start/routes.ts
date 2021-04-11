/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'api/RegisterController.store').middleware('isGuest')
  Route.post('login', 'api/AuthController.create').middleware('isGuest')
  Route.get('logout', 'api/AuthController.destroy').middleware('isLoggedIn')
}).prefix('auth')

Route.group(() => {
  Route.get('/', 'api/ContainersController.index')
  Route.post('create', 'api/ContainersController.create')
  Route.get(':id', 'api/ContainersController.show').where('id', /^[0-9]+$/)
  Route.patch(':id', 'api/ContainersController.update').where('id', /^[0-9]+$/)
  Route.delete(':id', 'api/ContainersController.destroy').where('id', /^[0-9]+$/)
}).prefix('container').middleware('isLoggedIn')
