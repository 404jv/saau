import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { makeApp } from '../factory/make-app.js';

describe('POST /api/v1/users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await makeApp();
  });

  afterAll(async () => {
    await app.close();
  });

  const validUser = {
    name: 'John Doe',
    gender: 'male',
    email: 'john@example.com',
    password: 'password123',
  };

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(validUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', validUser.name);
    expect(response.body).toHaveProperty('email', validUser.email);
    expect(response.body).not.toHaveProperty('password');
  });

  it('should not create with duplicate email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(validUser);

    expect(response.status).toBe(409);
  });

  it('should return 400 for invalid name (too short)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ ...validUser, name: 'Jo', email: 'short@example.com' });

    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid name (too long)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ ...validUser, name: 'A'.repeat(121), email: 'long@example.com' });

    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ ...validUser, email: 'not-an-email' });

    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid password (too short)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({ ...validUser, password: '123', email: 'pw@example.com' });

    expect(response.status).toBe(400);
  });

  it('should return 400 for invalid password (too long)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        ...validUser,
        password: 'A'.repeat(33),
        email: 'pw2@example.com',
      });

    expect(response.status).toBe(400);
  });
});
