import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

export interface User {
  email: string;
  roles: string[];
}

const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const emptyuser: User = { email: '', roles: [] };
  const [user, setUser] = useState<User>(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({
            email: data.email,
            roles: data.roles || [], // safe default
          });
          setAuthorized(true);
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry('https://localhost:4000/pingauth', {
      method: 'GET',
      credentials: 'include',
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export default AuthorizeView;
export { UserContext };
