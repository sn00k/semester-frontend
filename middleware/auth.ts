import { useAuthStore } from '~/stores/authStore';
import type { Context } from '@nuxt/types';

export default async function ({ req, redirect }: Context) {
  const authStore = useAuthStore();
  let isAuthenticated = false;

  if (req && req.headers.cookie) {
    const cookies = req.headers.cookie
      .split(';')
      .reduce((acc: { [key: string]: string }, cookie: string) => {
        const [key, value] = cookie.split('=');
        acc[key.trim()] = decodeURIComponent(value);
        return acc;
      }, {});

    const authToken = cookies.authToken;
    if (authToken) {
      isAuthenticated = await verifyToken(authToken);
    }
  }

  authStore.setAuthUser(isAuthenticated);

  if (!isAuthenticated) {
    redirect('/login');
  }
}

async function verifyToken(token: string): Promise<boolean> {
  // TODO: Implement token verification logic by calling the API to verify the token

  // Placeholder logic to simulate token verification
  return token === 'valid-token';
}
