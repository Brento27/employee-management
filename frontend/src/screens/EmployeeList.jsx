import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployeeListFilter from '../components/EmployeeListFilter';
import Menu from '../components/Menu';
import { filterListUsers, listUsers } from '../actions/userActions';
import { listDepartments } from '../actions/departmentActions';

function EmployeeList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
      dispatch(listDepartments());
      dispatch(filterListUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo]);
  return (
    <div>
      <NavBar />
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='w-full'>
          <p className='font-bold text-3xl'>Employees</p>
          <EmployeeListFilter />
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
