import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  NewUserRequest,
  Todo
} from '../models';
import {NewUserRequestRepository} from '../repositories';

export class NewUserRequestTodoController {
  constructor(
    @repository(NewUserRequestRepository) protected newUserRequestRepository: NewUserRequestRepository,
  ) { }

  @get('/user/{id}/todos', {
    responses: {
      '200': {
        description: 'Array of User has many Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.newUserRequestRepository.todos(id).find(filter);
  }

  @post('/user/{id}/todos', {
    responses: {
      '200': {
        description: 'NewUserRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof NewUserRequest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodoInNewUserRequest',
            exclude: ['id'],
//            optional: ['newUserRequestId']
          }),
        },
      },
    }) todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.newUserRequestRepository.todos(id).create(todo);
  }

  @patch('/user/{id}/todos', {
    responses: {
      '200': {
        description: 'NewUserRequest.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Partial<Todo>,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.newUserRequestRepository.todos(id).patch(todo, where);
  }

  @del('/user/{id}/todos', {
    responses: {
      '200': {
        description: 'NewUserRequest.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.newUserRequestRepository.todos(id).delete(where);
  }
}
