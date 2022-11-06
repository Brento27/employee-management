import React, { useEffect } from 'react';
import { listUsers } from '../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartmentDetails } from '../actions/departmentActions';
import { useDispatch, useSelector } from 'react-redux';
import EditDepartmentForm from '../components/EditDepartmentForm';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';

function EditDepartment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { departmentId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
      dispatch(listUsers());
      dispatch(getDepartmentDetails(departmentId));
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
          <p className='font-bold text-3xl'>Edit Departments</p>
          <EditDepartmentForm />
        </div>
      </div>
    </div>
  );
}

export default EditDepartment;
