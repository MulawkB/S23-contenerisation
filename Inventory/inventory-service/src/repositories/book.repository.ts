import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Book} from '../models';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Book, dataSource);
  }
}
