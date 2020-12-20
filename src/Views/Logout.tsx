import { FC } from 'react';
import cookie from 'js-cookie';

const logout:FC = () => {
  cookie.remove('token');
  window.location.href = '/';
  return <div>Redirecting...</div>;
};

export default logout;