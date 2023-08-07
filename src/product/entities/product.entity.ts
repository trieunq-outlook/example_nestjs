// product/product..ts
import { BaseEntity } from '@/common/base.entities';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
