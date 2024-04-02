import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('swsCompanyScore')
export class CompanyScoreModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  dateGenerated: Date;

  @Field()
  @Column('integer')
  dividend: number;

  @Field()
  @Column('integer')
  future: number;

  @Field()
  @Column('integer')
  health: number;

  @Field()
  @Column('integer')
  management: number;

  @Field()
  @Column('integer')
  past: number;

  @Field()
  @Column('integer')
  value: number;

  @Field()
  @Column('integer')
  misc: number;

  @Field()
  @Column('integer')
  total: number;

  @Field()
  @Column()
  sentence: string;
}
