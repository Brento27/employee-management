import React, { useEffect } from 'react';
import CreateEmployeeForm from '../components/CreateEmployeeForm';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { listDepartments } from '../actions/departmentActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { DEPARTMENT_REGISTER_RESET } from '../constants/departmentConstants';

function CreateEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
      dispatch(listDepartments());
    } else {
      navigate('/login');
    }
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: DEPARTMENT_REGISTER_RESET,
    });
  }, [dispatch, userInfo, navigate]);
  return (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='w-full h-full border-2 border-primary rounded-2xl p-6 mb-4 bg-white'>
          <p className='font-bold text-3xl'>Create Employee</p>
          <CreateEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
