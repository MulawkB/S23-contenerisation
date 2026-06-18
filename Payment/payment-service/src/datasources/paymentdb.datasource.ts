import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'paymentdb',
  connector: 'mongodb',
  url: `mongodb://${process.env.MONGO_HOST}:27017/paymentdb`,
};

@lifeCycleObserver('datasource')
export class PaymentdbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'paymentdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.paymentdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}