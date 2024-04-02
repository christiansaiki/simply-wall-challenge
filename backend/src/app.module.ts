import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { CompanyScoreModule } from './companyScore/companyScore.module';
import { CompanyPriceCloseModule } from './companyPriceClose/companyPriceClose.module';

// Otherwise e2e fails with EntityMetadataNotFoundError: No metadata for "CompanyModel" was found
const entities =
  process.env.NODE_ENV === 'test'
    ? ['src/**/*.model{.ts,.js}']
    : ['dist/**/*.model{.ts,.js}'];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/../db/sws.sqlite3',
      entities,
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CompanyModule,
    CompanyScoreModule,
    CompanyPriceCloseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
