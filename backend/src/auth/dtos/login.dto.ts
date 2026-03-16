import { z } from 'zod';

export const loginBody = z.object({
  email: z
    .string({ error: 'E-mail é obrigatório' })
    .email('E-mail inválido'),
  password: z.string({ error: 'Senha é obrigatória' }),
});

export type LoginDto = z.infer<typeof loginBody>;
