import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import EditEmployeeForm from '../components/EditEmployeeForm';
import { listDepartments } from '../actions/departmentActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import { DEPARTMENT_REGISTER_RESET } from '../constants/departmentConstants';

function EditEmployee() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listDepartments());
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: DEPARTMENT_REGISTER_RESET,
    });
  }, [dispatch, userInfo]);
  return (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4 bg-gray-300'>
        <Menu />
        <div className='w-full h-full border-2 border-primary rounded-2xl p-6 mb-4 bg-white'>
          <p className='font-bold text-3xl'>Edit Employee</p>
          <EditEmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
