import { dataTestIds } from "../../tests/constants/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validEmailRegex } from "../../tests/constants/components";
import { useRegisterMutation } from "./registerApi"; // Import the useRegisterMutation hook
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, loginAsync } from "../../auth/authSlice.jsx";
import { useLoginMutation } from "../login/loginApi.js";
import { setLoading, setError, setSuccess, registerAsync } from './registerSlice.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [register, { isLoading }] = useRegisterMutation(); // Use the useRegisterMutation hook
  const [login, {isLoadings}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    if (name.length < 3 ) {
      toast.warning('Name must be at least 3 characters long', { position: "top-center" });
      setError(true);
      return;
    }
    if (!validEmailRegex.test(email)) {
      toast.warning('Email is not of a valid format', { position: "top-center" });
      setError(true);
      return;
    }
    if (password.length < 10) {
      toast.warning('Password must be at least 10 characters long', { position: "top-center" });
      setError(true);
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setError(true);
      return;
    }

    try {
      dispatch(setLoading());
      await dispatch(registerAsync({ name, email, password }));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Registration successful
      setSuccess(true);
      setError(false);
      const userData = await login({email: email, password: password }).unwrap();
      dispatch(setCredentials(userData))
      navigate("/");
    } catch (error) {
      // Registration failed
      setError(true);
      setSuccess(false);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div data-testid="notifications-container">
      <form data-testid={dataTestIds.containerId.form}>
        <label className="formText">Name<span className="errmsg">*</span></label>
        <input data-testid="name-input" value={name} className="formControl" onChange={e => setName(e.target.value)} required />
                
        <label className="formText">Email<span className="errmsg">*</span></label>
        <input data-testid="email-input" value={email} type="email" className="formControl" onChange={e => setEmail(e.target.value)} required />
                      
        <label className="formText">Password <span className="errmsg">*</span></label>
        <input data-testid="password-input" value={password} type="password" className="formControl" onChange={e => setPassword(e.target.value)} required />

        <label className="formText">Confirm Password<span className="errmsg">*</span></label>
        <input data-testid="passwordConfirmation-input" value={confirmPassword} type="password" className="formControl" onChange={e => setConfirmPassword(e.target.value)} required />

        <div className="cardFooter">
          <button type="submit" data-testid="submit" className="btnSubmit" onClick={handleRegister}>Register</button>
        </div>
      </form>

      {error && <p data-testid="auth-error-notification" className="error">error occured!</p>}
      {success && <p className="success" data-testid="auth-success-notification">Registration successful!</p>}
    </div>
  );
};

export default Register;



/* import { dataTestIds } from "../../tests/constants/components";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { registerUser } from '../../auth/authSlice';
import { validEmailRegex } from "../../tests/constants/components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const success = useSelector((state) => state.auth.success);
  const error = useSelector((state) => state.auth.error);
  const [successs, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name.length < 3 ) {
      toast.warning('Name must be at least 3 characters long', { position: "top-center" });
      setError(true);
      return;
    }
    if (!validEmailRegex.test(email)) {
      toast.warning('Email is not of a valid format', { position: "top-center" });
      setError(true);
      return;
    }
    if (password.length < 10) {
      toast.warning('Password must be at least 10 characters long', { position: "top-center" });
      setError(true);
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setError(true);
      return;
    }

    try {
      await dispatch(registerUser({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      console.log("User registered successfully:", response.data);
      setSuccess(true);
      setError(false);
      navigate("/");
    } catch (error) {
      setError(true);
      setSuccess(false);
      console.error('Registration failed:', error.response.data.error);
    }
  };

  return (
    <div data-testid="notifications-container">
       <form data-testid={dataTestIds.containerId.form}>
        <label className="formText">Name<span className="errmsg">*</span></label>
        <input data-testid="name-input" value={name} className="formControl" onChange={e => setName(e.target.value)} required />
                
        <label className="formText">Email<span className="errmsg">*</span></label>
        <input data-testid="email-input" value={email} type="email" className="formControl" onChange={e => setEmail(e.target.value)} required />
                      
        <label className="formText">Password <span className="errmsg">*</span></label>
        <input data-testid="password-input" value={password} type="password" className="formControl" onChange={e => setPassword(e.target.value)} required />

        <label className="formText">Confirm Password<span className="errmsg">*</span></label>
        <input data-testid="passwordConfirmation-input" value={confirmPassword} type="password" className="formControl" onChange={e => setConfirmPassword(e.target.value)} required />

        <div className="cardFooter">
          <button type="submit" data-testid="submit" className="btnSubmit" onClick={handleRegister}>Register</button>
        </div>
      </form>
      {loading && <p data-testid="auth-loading-notification">Loading...</p>}
      {error && <p data-testid="auth-error-notification" className="error">Registration failed!</p>}
      {success && <p className="success" data-testid="auth-success-notification">Registration successful!</p>}
    </div>
  );
};

export default Register;
 */