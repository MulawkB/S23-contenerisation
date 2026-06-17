import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PaymentdbDataSource} from '../datasources';
import {Payment, PaymentRelations} from '../models';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.orderId,
  PaymentRelations
> {
  constructor(
    @inject('datasources.paymentdb') dataSource: PaymentdbDataSource,
  ) {
    super(Payment, dataSource);
  }
}
