import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './identity.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { API_URL } from '../api/MoviesAPI';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      if (name === 'rememberme') {
        setRememberme(checked);
      } else if (name === 'showPassword') {
        setShowPassword(checked);
      }
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = `${API_URL}/custom-login`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe: rememberme,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      // ✅ navigate based on role
      if (data.roles?.includes('Admin')) {
        navigate('/admin');
      } else {
        navigate('/movies');
      }
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="netflix-login-container">
      <div className="netflix-login-card">
        <h1 className="login-h1">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="showPassword"
                checked={showPassword}
                onChange={handleChange}
              />
              Show password
            </label>
            <label>
              <input
                type="checkbox"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
          <button className="btn" type="button" onClick={handleRegisterClick}>
            Register
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
