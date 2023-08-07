import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  AfterLoad,
} from 'typeorm';
import { encryptStr } from './encryption';
import { ApiTags } from '@nestjs/swagger';

@Entity()
@ApiTags('Products')
export abstract class BaseEntity {
  constructor(partial: Partial<BaseEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 3 })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamps() {
    this.updatedAt = new Date();
  }

  public unixTime: number;
  @AfterLoad()
  public getUnixTime() {
    this.unixTime = this.updatedAt.getTime();
  }

  public hash: string;
  @AfterLoad()
  public getHash() {
    this.hash = encryptStr(this.id.toString());
  }
}
