import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Identity.css';
import '@fortawesome/fontawesome-free/css/all.css';

function LoginPage() {
  // State variables for email, password, and checkboxes.
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // State variable for error messages.
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Handle change events for input fields.
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

  // Handle submit event for the form.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://localhost:5000/login?useCookies=true'
      : 'https://localhost:5000/login?useSessionCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent & received.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content.
      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/admin');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {/* Added a max-width to the card to constrain its size and applied the cream background */}
        <div className="card cream-bg border-0 shadow rounded-3" style={{ maxWidth: '500px' }}>
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
              </div>

              {/* Checkbox to toggle password visibility */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  name="showPassword"
                  checked={showPassword}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="showPassword">
                  Show password
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberme"
                  name="rememberme"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberme">
                  Remember password
                </label>
              </div>

              {/* Added the custom "btn-narrow" class to reduce button width */}
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold btn-narrow"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold btn-narrow"
                  type="button"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-google btn-login text-uppercase fw-bold btn-narrow"
                  type="button"
                >
                  <i className="fa-brands fa-google me-2"></i> Sign in with Google
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-facebook btn-login text-uppercase fw-bold btn-narrow"
                  type="button"
                >
                  <i className="fa-brands fa-facebook-f me-2"></i> Sign in with Facebook
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
