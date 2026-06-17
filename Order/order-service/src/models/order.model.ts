import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  customerName!: string;

  @property({
    type: 'string',
    required: true,
  })
  orderDate!: string;

  @property({
    type: 'number',
    required: true,
  })
  totalAmount!: number;

  @property({
    type: 'string',
    required: true,
  })
  status!: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}