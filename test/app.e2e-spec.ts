import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/url/:shortURL (GET)', () => {
    it('should return 302 and redirect to longURL',async()=>{
      const shortLink:string ='linkThatExists'
      const res = await request(app.getHttpServer()).get(`/url/${shortLink}`);
      expect(res.statusCode).toBe(302)
    })
    it('should return 404 if short URL is not found', async () => {
      const shortURL:string = 'linkThatDoesNotExists';
      const res = await request(app.getHttpServer()).get(`/url/${shortURL}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Short URL was not found');
    });
  });
  describe('/url (POST)', () => {
    it('should return 201 and short string',async()=>{
      const longURL:string ='https://www.youtube.com/'
      const res = await request(app.getHttpServer()).post(`/url`).send({ url: longURL });
      expect(res.statusCode).toBe(201)
      expect(res.body.shortURL).toBeDefined()
      expect(typeof res.body.shortURL).toBe("string")
      expect (res.body.shortURL.length).toBeGreaterThan(0);
    })
    it('should return 400 if long URL already exists', async () => {
      const longURL:string ='https://www.youtube.com/'
      const res = await request(app.getHttpServer()).post(`/url`).send({ url: longURL });
      expect(res.statusCode).toBe(400)
      expect(res.body.message).toBe('Such URL already exists');
    });
    it('should return 400 if url is empty or missing', async () => {
      const longURL:string =''
      const res = await request(app.getHttpServer()).post(`/url`).send({ url: longURL });
      expect(res.statusCode).toBe(400)
      expect(res.body.message).toStrictEqual(["url must be a URL address"]);
    });
  });
});
