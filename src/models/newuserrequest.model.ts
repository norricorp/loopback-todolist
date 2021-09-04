import {
  User
} from '@loopback/authentication-jwt';
import {hasMany, model, property} from '@loopback/repository';
import {Todo} from './todo.model';



@model()
export class NewUserRequest extends User {
    @property({
      type: 'string',
      required: true,
    })
    password: string;

    @hasMany(() => Todo)
    todos: Todo[];
  }

  export interface NewUserRequestRelations {
    // describe navigational properties here
    todos?: NewUserRequestRelations[];
  }

  export type NewUserRequestWithRelations = Todo & NewUserRequestRelations;

