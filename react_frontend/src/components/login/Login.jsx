import { dataTestIds } from "../../tests/constants/components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading, setError, loginAsync } from "../../auth/authSlice.jsx"; // Import the addNotification action creator
import { useLoginMutation } from "./loginApi";
import { validEmailRegex } from "../../tests/constants/components";


const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef();
    const [login, { isLoading, errors }] = useLoginMutation();
    const email = useSelector((state) => state.auth.email);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isError = useSelector((state) => state.auth.error);
    const role = useSelector((state) => state.auth.role);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setError(error);
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.length < 3 ) {
            toast.warning('Name must be at least 3 characters long', { position: "top-center" });
            setError(true);
            return;
          }
          if (!validEmailRegex.test(user)) {
            toast.warning('Email is not of a valid format', { position: "top-center" });
            setError(true);
            return;
          }
          if (pwd.length < 10) {
            toast.warning('Password must be at least 10 characters long', { position: "top-center" });
            setError(true);
            return;
          }
          

        try {
            dispatch(setLoading());
            navigate('/');
            const userData = await login({email: user, password: pwd }).unwrap();
            console.log("userData:", userData);
            dispatch(setCredentials(userData)); 
            // await dispatch(loginAsync({ email, password }));
            setUser('');
            setPwd('');
            setSuccess(true);
            setError(false);
            navigate('/');
            
        } catch (err) {
            if (err.status === 403) {
                // Handle invalid credentials
                toast.error('Invalid email or password. Please try again.');
                setError(true);
                navigate('/login');
            } else {
                // Handle other errors
                toast.error('Login failed. Please check your credentials.');
                setError(true);
                setSuccess(false);
                setUser('');
                setPwd('');
                console.log(err);
            }
          }
    }

    return (
        <div data-testid="notifications-container">
          {error === true || errors === true ? <p data-testid="auth-error-notification" className="error">error occured!</p> : (
            <div data-testid="auth-success-notification" className="loginForm">
              <form data-testid={dataTestIds.containerId.form}>
                <div className="card">
                  <div className="cardHeader">
                    <h2>User Login</h2>
                  </div>
                  <div className="cardBody">
                    <label className="formText">Email<span className="errmsg">*</span></label>
                    <input data-testid={dataTestIds.inputId.email} value={user} ref={userRef} type="email" className="formControl" onChange={e => setUser(e.target.value)} required />
                    <label className="formText">Password <span className="errmsg">*</span></label>
                    <input data-testid={dataTestIds.inputId.password} value={pwd} type="password" className="formControl" onChange={e => setPwd(e.target.value)} required />
                  </div>
                  <div className="cardFooter">
                    <button type="submit" data-testid="submit" className="btnSubmit" onClick={handleSubmit}>Login</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      );
}

export default Login;





/* import { dataTestIds } from "../../tests/constants/components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../auth/authSlice.jsx"; // Import the addNotification action creator
import { validEmailRegex } from "../../tests/constants/components";
import { loginsUser } from './LoginSlice.js';


const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRef = useRef();
    const logins = useSelector((state) => state.logins.items);
    const status = useSelector((state) => state.logins.status);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setError(error);
    }, [error]);

    const handleSubmit = async (e, user, pwd) => {
        e.preventDefault();

        if (user.length < 3 ) {
            toast.warning('Name must be at least 3 characters long', { position: "top-center" });
            setError(true);
            return;
          }
          if (!validEmailRegex.test(user)) {
            toast.warning('Email is not of a valid format', { position: "top-center" });
            setError(true);
            return;
          }
          if (pwd.length < 10) {
            toast.warning('Password must be at least 10 characters long', { position: "top-center" });
            setError(true);
            return;
          }
          

        try {
            dispatch(setLoading());
            navigate('/');
            dispatch(loginsUser(user, pwd)); 
            setUser('');
            setPwd('');
            setSuccess(true);
            setError(false);
            navigate('/');
            
        } catch (err) {
            if (err.status === 403) {
                // Handle invalid credentials
                toast.error('Invalid email or password. Please try again.');
                setError(true);
                navigate('/login');
            } else {
                // Handle other errors
                toast.error('Login failed. Please check your credentials.');
                setError(true);
                setSuccess(false);
                setUser('');
                setPwd('');
                console.log(err);
            }
          }
    }

    return (
        <div data-testid="notifications-container">
          {error === true || status === 'rejected'? <p data-testid="auth-error-notification" className="error">error occured!</p> : (
            <div data-testid="auth-success-notification" className="loginForm">
              <form data-testid={dataTestIds.containerId.form}>
                <div className="card">
                  <div className="cardHeader">
                    <h2>User Login</h2>
                  </div>
                  <div className="cardBody">
                    <label className="formText">Email<span className="errmsg">*</span></label>
                    <input data-testid={dataTestIds.inputId.email} value={user} ref={userRef} type="email" className="formControl" onChange={e => setUser(e.target.value)} required />
                    <label className="formText">Password <span className="errmsg">*</span></label>
                    <input data-testid={dataTestIds.inputId.password} value={pwd} type="password" className="formControl" onChange={e => setPwd(e.target.value)} required />
                  </div>
                  <div className="cardFooter">
                    <button type="submit" data-testid="submit" className="btnSubmit" onClick={()=> handleSubmit(e, user, pwd)}>Login</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      );
}

export default Login;
 */