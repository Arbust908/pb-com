export const fullActions = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  } as const;
export type ActionTypes = keyof typeof fullActions;