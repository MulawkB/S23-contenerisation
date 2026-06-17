import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Book extends Entity {

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
  title!: string;

  @property({
    type: 'string',
    required: true,
  })
  author!: string;

  @property({
    type: 'string',
    required: true,
  })
  price!: string;

  @property({
    type: 'string',
    required: true,
  })
  stock!: string;

  [prop: string]: any;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}