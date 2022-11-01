import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateDepartmentForm from '../components/CreateDepartmentForm';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { listUsers } from '../actions/userActions';

function CreateDepartment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo]);
  return (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='w-full h-full'>
          <p className='font-bold text-3xl'>Create Departments</p>
          <CreateDepartmentForm />
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
