import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { DEPARTMENT_REGISTER_RESET } from '../constants/departmentConstants';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    } else {
      if (Object.keys(formErrors).length === 0 && submitted) {
        dispatch(login(formValues.email, formValues.password));
      } else {
        setSubmitted(false);
      }
    }
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: DEPARTMENT_REGISTER_RESET,
    });
  }, [userInfo, formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    e.preventDefault();
  };

  const submitHandler = (e) => {
    setFormErrors(validate(formValues));
    setSubmitted(true);
    e.preventDefault();
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be atleast 6 characters long';
    } else if (values.password.length > 12) {
      errors.password = 'Password may not have more that 12 characters';
    }

    return errors;
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='bg-gray-300 h-full'>
      <div className='flex items-center flex-col p-8 pb-16'>
        <p className='text-4xl m-12 font-bold'>Login</p>
        <div className='form-control w-full max-w-2xl mb-2'>
          <label className='label'>
            <span className='label-text'>Email</span>
          </label>
          <input
            type='text'
            name='email'
            placeholder='Type Username Here'
            value={formValues.email}
            onChange={handleChange}
            className='input input-bordered input-primary w-full max-w-2xl'
          />
          <p className='mt-4 text-error'>{formErrors.email}</p>
        </div>
        <div className='form-control w-full max-w-2xl mt-6 mb-2'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input
            type='password'
            name='password'
            placeholder='Type Password Here'
            value={formValues.password}
            onChange={handleChange}
            className='input input-bordered input-primary w-full max-w-2xl'
          />
          <p className='mt-4 text-error'>{formErrors.password}</p>
        </div>

        <button
          className={`btn btn-success px-36 mt-12`}
          onClick={submitHandler}
        >
          Login
        </button>
        {error && <p className='text-error mt-4 text-xl text-bold'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
