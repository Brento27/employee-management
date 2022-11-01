import React, { useEffect } from 'react';
import CreateEmployeeForm from '../components/CreateEmployeeForm';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';

function CreateEmployee() {
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
          <p className='font-bold text-3xl'>Create / Edit Employee</p>
          <CreateEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
