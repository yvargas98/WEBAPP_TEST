import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  email: string
  logoutUrl: string
  iat: number
  name: string
  authenticated: boolean
  role: string
}

console.log(jwt.decode(cookie.get('token')));

export const isAuthenticated = (): boolean => !!jwt.decode(cookie.get('token'));

export const getTokenData = ():TokenPayload => {
  const token = cookie.get('token');
  const data = jwt.decode(token);
  const tokenData = data as TokenPayload;
  return {
    ...tokenData,
    authenticated: true,
  };
};

export const isAdmin = (): boolean => {
  const admin: boolean = true;
  const token = cookie.get('token');
  const data = jwt.decode(token);
  console.log(data);
  return admin;
}
