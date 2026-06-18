import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PaymentdbDataSource} from '../datasources';
import {Payment} from '../models';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: PaymentdbDataSource,
  ) {
    super(Payment, dataSource);
  }
}