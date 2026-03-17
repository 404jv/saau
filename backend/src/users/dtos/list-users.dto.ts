import { z } from 'zod';

export const listUsersQuery = z.object({
  query: z.string().optional(),
  page: z.coerce
    .number({ error: 'Página deve ser um número' })
    .int('Página deve ser um número inteiro')
    .min(1, 'Página deve ser no mínimo 1')
    .default(1),
  limit: z.coerce
    .number({ error: 'Limite deve ser um número' })
    .int('Limite deve ser um número inteiro')
    .min(1, 'Limite deve ser no mínimo 1')
    .max(100, 'Limite deve ser no máximo 100')
    .default(20),
});

export type ListUsersQuery = z.infer<typeof listUsersQuery>;
