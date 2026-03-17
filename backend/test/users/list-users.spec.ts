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

async function createAdminAndLogin(
  app: INestApplication,
  data: { name: string; gender: string; email: string; password: string },
) {
  const { userId, token } = await createUserAndLogin(app, data);

  const prisma = app.get(PrismaService);
  await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: true },
  });

  const loginRes = await request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send({ email: data.email, password: data.password });

  return { userId, token: loginRes.body.access_token };
}

describe('GET /api/v1/users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await makeApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 with users list for admin', async () => {
    const { token } = await createAdminAndLogin(app, {
      name: 'List Admin',
      gender: 'male',
      email: 'listadmin@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('page');
    expect(response.body).toHaveProperty('limit');
    expect(Array.isArray(response.body.users)).toBe(true);

    for (const user of response.body.users) {
      expect(user).not.toHaveProperty('password');
    }
  });

  it('should filter users by search query', async () => {
    const { token } = await createAdminAndLogin(app, {
      name: 'Search Admin',
      gender: 'male',
      email: 'searchadmin@example.com',
      password: 'password123',
    });

    await createUserAndLogin(app, {
      name: 'Unique Findable Name',
      gender: 'female',
      email: 'findable@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/users')
      .query({ query: 'Unique Findable' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThanOrEqual(1);
    expect(
      response.body.users.every((u: { name: string }) =>
        u.name.includes('Unique Findable'),
      ),
    ).toBe(true);
  });

  it('should paginate results', async () => {
    const { token } = await createAdminAndLogin(app, {
      name: 'Paginate Admin',
      gender: 'male',
      email: 'paginateadmin@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/users')
      .query({ page: 1, limit: 2 })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeLessThanOrEqual(2);
    expect(response.body.limit).toBe(2);
    expect(response.body.page).toBe(1);
    expect(response.body.total).toBeGreaterThanOrEqual(1);
  });

  it('should return 401 when unauthenticated', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/users');

    expect(response.status).toBe(401);
  });

  it('should return 403 for non-admin user', async () => {
    const { token } = await createUserAndLogin(app, {
      name: 'Regular User',
      gender: 'male',
      email: 'regularuser@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});
