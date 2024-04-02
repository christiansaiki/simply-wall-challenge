import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('CompanyScore (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('companyScore', () => {
    it('should retrieve all scores data', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `{
                scores {
                    total
                }
              }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.scores.length).toEqual(12);
          expect(res.body.data.scores[0]).toEqual({
            total: 9,
          });
        });
    });

    it('should a single score by companyId', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `{
                score(companyId: "46B285BC-B25F-4814-985C-390A4BFA2023") {
                    total
                }
              }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.score).toEqual({ total: 9 });
        });
    });
  });
});
