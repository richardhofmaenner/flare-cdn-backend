import { Exception } from '@poppinss/utils'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BelongsNotToUserException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BelongsNotToUserException extends Exception {
  constructor (message: string = 'This container does not belong to you.') {
    super(message, 401, 'E_OBJECT_BELONGS_NOT_TO_USER')
  }
}
