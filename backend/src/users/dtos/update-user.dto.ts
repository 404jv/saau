import { z } from 'zod';

export const updateUserBody = z.object({
  name: z
    .string({ error: 'Nome deve ser uma string' })
    .min(4, 'Nome deve ter no mínimo 4 caracteres')
    .max(120, 'Nome deve ter no máximo 120 caracteres')
    .optional(),
  gender: z.string({ error: 'Gênero deve ser uma string' }).optional(),
  email: z
    .string({ error: 'E-mail deve ser uma string' })
    .email('E-mail inválido')
    .optional(),
  password: z
    .string({ error: 'Senha deve ser uma string' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(32, 'Senha deve ter no máximo 32 caracteres')
    .optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserBody>;
