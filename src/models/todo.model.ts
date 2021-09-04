import {belongsTo, Entity, model, property} from '@loopback/repository';
import {NewUserRequest, NewUserRequestWithRelations} from './newuserrequest.model';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isComplete?: boolean;

  @belongsTo(() => TodoList)
  todoListId: number;

  @belongsTo(() => NewUserRequest)
  newUserRequestId: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  todoList?: TodoListWithRelations;
  newUserRequest?: NewUserRequestWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
