import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('swsCompanyPriceClose')
export class CompanyPriceCloseModel {
  @Field()
  @Column({ type: 'date' })
  @PrimaryColumn()
  date: Date;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field()
  @Column({ type: 'datetime' })
  dateCreated: Date;
}
