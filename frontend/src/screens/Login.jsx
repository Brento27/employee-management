import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='border-2 border-fuchsia-700 m-8 h-fit'>
      <p className='absolute top-5 left-12 bg-default px-2'>Login</p>
      <div className='flex items-center flex-col p-8 pb-16'>
        <p className='text-4xl my-12 mt-16 font-bold'>Login</p>
        <div className='form-control w-full max-w-2xl mb-6'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='text'
            placeholder='Type Username Here'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-bordered input-accent w-full max-w-2xl'
          />
        </div>
        <div className='form-control w-full max-w-2xl mt-6 mb-12'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input
            type='password'
            placeholder='Type Password Here'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input input-bordered input-accent w-full max-w-2xl'
          />
        </div>
        {error && (
          <div className='mb-4'>{error} (Invalid email or password)</div>
        )}
        <button className='btn btn-accent px-36' onClick={submitHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
