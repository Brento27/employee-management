import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listDepartments,
  listDepartmentsfilter,
} from '../actions/departmentActions';
import DepartmentListFilter from '../components/DepartmentListFilter';
import DepartmentListTable from '../components/DepartmentListTable';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import Pagination from '../components/PaginationEmployee';
import PerPageAndSearchDepartment from '../components/PerPageAndSearchDepartment';

function DepartmentList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listDepartments());
      dispatch(listDepartmentsfilter());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo]);
  return (
    <div>
      <NavBar />

      <div className='w-full h-full'>
        <DepartmentListFilter />
      </div>
    </div>
  );
}

export default DepartmentList;
