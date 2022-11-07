import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployeeListFilter from '../components/EmployeeListFilter';
import { filterListUsers, listUsers } from '../actions/userActions';
import { listDepartments } from '../actions/departmentActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DEPARTMENT_REGISTER_RESET } from '../constants/departmentConstants';

function EmployeeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfoRegister, error } = userRegister;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
      dispatch(listDepartments());
      dispatch(filterListUsers());
      dispatch({
        type: DEPARTMENT_REGISTER_RESET,
      });
      if (userInfoRegister) {
        toast.success('User created successfully!', {
          position: 'bottom-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (error) {
        toast.error('There was a problem creating a new employee!', {
          position: 'bottom-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, userInfoRegister, error]);
  return (
    <div className='bg-gray-300 h-full'>
      {userInfoRegister || error ? (
        <ToastContainer
          position='bottom-center'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      ) : (
        ''
      )}
      <NavBar />
      <div className='w-full'>
        <EmployeeListFilter />
      </div>
    </div>
  );
}

export default EmployeeList;
