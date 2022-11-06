import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import EditEmployeeForm from '../components/EditEmployeeForm';
import { listDepartments } from '../actions/departmentActions';

function EditEmployee() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch, userInfo]);
  return (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='w-full h-full'>
          <p className='font-bold text-3xl'>Edit Employee</p>
          <EditEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
