import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo} from '../models';
import {NewUserRequest, NewUserRequestRelations} from '../models/newuserrequest.model';
import {TodoRepository} from './todo.repository';

export class NewUserRequestRepository extends DefaultCrudRepository<
  NewUserRequest,
  typeof NewUserRequest.prototype.id,
  NewUserRequestRelations
> {
  public readonly todos: HasManyRepositoryFactory<Todo, typeof NewUserRequest.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(NewUserRequest, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    // this line enables inclusion for this relation
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
