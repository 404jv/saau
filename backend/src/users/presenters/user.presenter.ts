import { User } from '@prisma/client';

export function userPresenter(user: User) {
  const { password, ...rest } = user;
  return rest;
}
