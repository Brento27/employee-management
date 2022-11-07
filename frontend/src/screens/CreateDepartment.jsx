import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateDepartmentForm from '../components/CreateDepartmentForm';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { DEPARTMENT_REGISTER_RESET } from '../constants/departmentConstants';

function CreateDepartment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading } = userList;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: DEPARTMENT_REGISTER_RESET,
    });
  }, [dispatch, userInfo]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='w-full h-full border-2 border-primary rounded-2xl p-6 mb-4 bg-white'>
          <p className='font-bold text-3xl'>Create Departments</p>
          <CreateDepartmentForm />
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
