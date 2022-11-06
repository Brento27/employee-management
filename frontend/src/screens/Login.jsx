import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState('btn-disabled');
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [messageError, setMessageError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isManager) {
        navigate('/employee/list');
      } else {
        navigate(`/employee/edit/${userInfo._id}`);
      }
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      dispatch(login(email, password));
    } catch (err) {
      console.error(err);
    }
    if (error) setMessageError(error);
  };

  const handleEmailChange = (e) => {
    if (email === '') {
      setBtnDisabled('btn-disabled');
      setMessageEmail(null);
    } else if (email !== '' && email.trim().length <= 10) {
      setBtnDisabled('btn-disabled');
      setMessageEmail('Not a valid email');
    } else {
      if (messagePassword === null) setBtnDisabled('');
      setMessageEmail(null);
    }

    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (password === '') {
      setBtnDisabled('btn-disabled');
      setMessagePassword(null);
    } else if (password !== '' && password.trim().length <= 10) {
      setBtnDisabled('btn-disabled');
      setMessagePassword('Password has to be 8 characters long');
    } else {
      if (messageEmail === null) setBtnDisabled('');
      setMessagePassword(null);
    }

    setPassword(e.target.value);
  };
  return loading ? (
    ''
  ) : (
    <div className='bg-gray-300 h-screen'>
      <div className='flex items-center flex-col p-8 pb-16'>
        <p className='text-4xl m-12 font-bold'>Login</p>
        <div className='form-control w-full max-w-2xl mb-2'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='text'
            placeholder='Type Username Here'
            value={email}
            onChange={handleEmailChange}
            className='input input-bordered input-primary w-full max-w-2xl'
          />
        </div>
        {messageEmail && <div className='message'>{messageEmail}</div>}
        <div className='form-control w-full max-w-2xl mt-6 mb-2'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input
            type='password'
            placeholder='Type Password Here'
            value={password}
            onChange={handlePasswordChange}
            className='input input-bordered input-primary w-full max-w-2xl'
          />
        </div>
        {messagePassword && <div className='message'>{messagePassword}</div>}

        <button
          className={`btn btn-success ${btnDisabled} px-36 mt-12`}
          onClick={submitHandler}
        >
          Login
        </button>
        {messageError && <div className='message'>{messageError}</div>}
      </div>
    </div>
  );
};

export default Login;
