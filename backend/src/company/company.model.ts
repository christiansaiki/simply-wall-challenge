// src/invoice/customer.model.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CompanyPriceCloseModel } from '../companyPriceClose/companyPriceClose.model';
import { CompanyScoreModel } from '../companyScore/companyScore.model';

@ObjectType()
@Entity('swsCompany')
export class CompanyModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  tickerSymbol: string;

  @Field()
  @Column()
  exchangeSymbol: string;

  @Field()
  @Column()
  uniqueSymbol: string;

  @Field()
  @Column()
  dateGenerated: Date;

  @Field()
  @Column()
  securityName: string;

  @Field()
  @Column()
  exchangeCountryIso: string;

  @Field()
  @Column()
  listingCurrencyIso: string;

  @Field()
  @Column()
  canonicalUrl: string;

  @Field()
  @Column()
  uniqueSymbolSlug: string;

  @Field(() => CompanyScoreModel)
  score: CompanyScoreModel;

  @Field(() => [CompanyPriceCloseModel])
  prices: CompanyPriceCloseModel[];
}
