import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './identity.css';
import { API_URL } from '../api/MoviesAPI';


function Register() {
  // State variables for email and passwords
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State variable for error messages
  const [error, setError] = useState('');
  // State variable for toggling show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');

      fetch(`${API_URL}/register`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: password
        }),
      })
        .then((data) => {
          console.log(data);
          if (data.ok) setError('Successful registration. Please log in.');
          else setError('Error registering.');
        })
        .catch((error) => {
          console.error(error);
          setError('Error registering.');
        });
    }
  }; // ✅ <- this was missing
  return (
    <div className="netflix-login-container">
      <div className="netflix-login-card">
        <h1 className='login-h1'>Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <input
            className="form-control"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />
          {/* Centered Show/Hide Password Checkbox */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={toggleShowPassword}
              style={{ marginRight: '0.5rem' }}
            />
            <label htmlFor="showPassword" style={{ color: '#333', fontSize: '0.9rem' }}>
              Show Password
            </label>
          </div>
          <button className="btn" type="submit">
            Register
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={handleLoginClick}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
