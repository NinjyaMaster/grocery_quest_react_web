/* eslint-disable */
import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { AxiosContext } from '../contexts/AxiosProvider';
import { LOGIN_URL } from '../constants/network';
import secureLocalStorage from 'react-secure-storage';

function Login() {
  const { setAuthState, logout } = useAuth();
  const { publicAxios } = useContext(AxiosContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();

    // call logout to clear all token and auth info
    logout();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [enteredEmail, enteredPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await publicAxios.post(LOGIN_URL, {
        email: enteredEmail,
        password: enteredPassword,
      });

      const { access, refresh } = response?.data?.tokens;
      const { email, username } = response?.data;

      setAuthState({
        authenticated: true,
        email: email,
        username: username,
      });
      secureLocalStorage.setItem('accessToken', access);
      secureLocalStorage.setItem('refreshToken', refresh);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setEnteredEmail(e.target.value)}
          value={enteredEmail}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setEnteredPassword(e.target.value)}
          value={enteredPassword}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

export default Login;
