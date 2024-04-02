import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('CompanyResolver (e2e)', () => {
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

  describe('company', () => {
    it('should retrieve all companies data', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `{
                companies {
                    name
                }
              }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.companies.length).toEqual(12);
          expect(res.body.data.companies[0]).toEqual({
            name: 'Afterpay',
          });
        });
    });

    it('should retrieve the total (overall) score', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `{
                companies {
                    score {
                        total
                    }
                }
              }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.companies[0]).toEqual({
            score: {
              total: 9,
            },
          });
        });
    });

    it('should retrieve the last price close', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `{
                  companies {
                      lastPriceClose {
                          price
                      }
                  }
                }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.companies[0]).toEqual({
            lastPriceClose: {
              price: 44.51,
            },
          });
        });
    });
  });

  it('should return all prices close', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `{
              companies {
                  prices {
                      price
                  }
              }
            }`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.companies[0].prices.length).toEqual(41);
        expect(res.body.data.companies[0].prices[0]).toEqual({ price: 15 });
      });
  });
});
