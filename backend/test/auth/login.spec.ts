import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { makeApp } from '../factory/make-app.js';

describe('POST /api/v1/auth/login', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await makeApp();

    await request(app.getHttpServer()).post('/api/v1/users').send({
      name: 'Login User',
      gender: 'male',
      email: 'login@example.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });

  it('should return 401 for wrong password', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'login@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });

  it('should return 401 for non-existent email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(response.status).toBe(401);
  });
});
