import type { JWTBody } from '../types/cryptography';
import type { ShortAccountInfo } from '../types/pdb';

const decodeJWT = (token: string): JWTBody =>
  JSON.parse(
    decodeURIComponent(
      atob(token.split('.')[1]!.replace(/-g/, '+').replace(/_/g, '/'))
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    ),
  );

export const extractAccountInfo = (token: string): ShortAccountInfo => {
  const { user_id, username } = decodeJWT(token);

  return {
    accessToken: token,
    username,
    id: user_id,
  };
};
