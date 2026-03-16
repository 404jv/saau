import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { makeApp } from '../factory/make-app.js';
import { PrismaService } from '@/prisma/prisma.service.js';

async function createUserAndLogin(
  app: INestApplication,
  data: { name: string; gender: string; email: string; password: string },
) {
  const createRes = await request(app.getHttpServer())
    .post('/api/v1/users')
    .send(data);

  const loginRes = await request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send({ email: data.email, password: data.password });

  return { userId: createRes.body.id, token: loginRes.body.access_token };
}

describe('PATCH /api/v1/users/:id', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await makeApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update self', async () => {
    const { userId, token } = await createUserAndLogin(app, {
      name: 'Update Self',
      gender: 'male',
      email: 'updateself@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Name');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should allow admin to update another user', async () => {
    const { userId } = await createUserAndLogin(app, {
      name: 'Target User',
      gender: 'female',
      email: 'target@example.com',
      password: 'password123',
    });

    const { token: adminToken } = await createUserAndLogin(app, {
      name: 'Admin User',
      gender: 'male',
      email: 'admin@example.com',
      password: 'password123',
    });

    const prisma = app.get(PrismaService);
    await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { isAdmin: true },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });

    const freshAdminToken = loginRes.body.access_token;

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${freshAdminToken}`)
      .send({ name: 'Admin Updated' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Admin Updated');
  });

  it('should return 403 when updating another user', async () => {
    const { userId } = await createUserAndLogin(app, {
      name: 'Other User',
      gender: 'male',
      email: 'other@example.com',
      password: 'password123',
    });

    const { token } = await createUserAndLogin(app, {
      name: 'Requester',
      gender: 'male',
      email: 'requester@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Hacked' });

    expect(response.status).toBe(403);
  });

  it('should return 409 for duplicate email', async () => {
    await createUserAndLogin(app, {
      name: 'Existing Email',
      gender: 'male',
      email: 'existing@example.com',
      password: 'password123',
    });

    const { userId, token } = await createUserAndLogin(app, {
      name: 'Dup Email',
      gender: 'male',
      email: 'dupemail@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'existing@example.com' });

    expect(response.status).toBe(409);
  });

  it('should return 400 for validation error', async () => {
    const { userId, token } = await createUserAndLogin(app, {
      name: 'Validation User',
      gender: 'male',
      email: 'validation@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .patch(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'ab' });

    expect(response.status).toBe(400);
  });

  it('should return 401 when unauthenticated', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/users/some-id')
      .send({ name: 'No Auth' });

    expect(response.status).toBe(401);
  });
});
