import { z } from 'zod';

export const createUserBody = z.object({
  name: z
    .string({ error: 'Nome é obrigatório' })
    .min(4, 'Nome deve ter no mínimo 4 caracteres')
    .max(120, 'Nome deve ter no máximo 120 caracteres'),
  gender: z.string({ error: 'Gênero é obrigatório' }),
  email: z.string({ error: 'E-mail é obrigatório' }).email('E-mail inválido'),
  password: z
    .string({ error: 'Senha é obrigatória' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(32, 'Senha deve ter no máximo 32 caracteres'),
});

export type CreateUserDto = z.infer<typeof createUserBody>;
