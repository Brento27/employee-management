import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listDepartments,
  listDepartmentsfilter,
} from '../actions/departmentActions';
import DepartmentListFilter from '../components/DepartmentListFilter';
import NavBar from '../components/NavBar';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DepartmentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const departmentRegister = useSelector((state) => state.departmentRegister);
  const { departmentInfo, error } = departmentRegister;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listDepartments());
      dispatch(listDepartmentsfilter());
    } else {
      navigate('/login');
    }
    if (departmentInfo) {
      toast.success('Department created successfully!', {
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
      toast.error('There was a problem creating a new department!', {
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
    dispatch({
      type: USER_REGISTER_RESET,
    });
  }, [dispatch, userInfo, departmentInfo, error]);
  return (
    <div>
      {departmentInfo || error ? (
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

      <div className='w-full h-full bg-gray-300'>
        <DepartmentListFilter />
      </div>
    </div>
  );
}

export default DepartmentList;
