import React from 'react';
import { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  listDepartmentsfilter,
  updateDepartment,
} from '../actions/departmentActions';
import Loader from './Loader';
import NoData from './NoData';

function DepartmentListTable() {
  const dispatch = useDispatch();
  const departmentListFilter = useSelector(
    (state) => state.departmentListFilter
  );
  const { departmentsfiltered, loadingDepartment } = departmentListFilter;

  useEffect(() => {}, departmentsfiltered);

  const submitHandler = async (e) => {
    const department = departmentsfiltered.filter(
      (department) => department._id == e.target.value
    )[0];
    if (department.status === 'active') {
      await dispatch(
        updateDepartment({
          _id: department._id,
          status: 'deactive',
        })
      );
    } else {
      await dispatch(
        updateDepartment({
          _id: department._id,
          status: 'active',
        })
      );
    }
    await dispatch(listDepartmentsfilter());

    e.preventDefault();
  };
  return loadingDepartment ? (
    <Loader />
  ) : departmentsfiltered[0] ? (
    <div className='overflow-x-auto my-4 px-6'>
      <div className='border-2 border-primary rounded-2xl p-1 mb-4 bg-white'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='w-24'></th>
              <th>Name</th>
              <th>Manager</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {departmentsfiltered?.map((department) => {
              return (
                <tr key={department._id}>
                  <td>
                    <div className='flex gap-2 justify-center items-center'>
                      <Link to={`/department/edit/${department._id}`}>
                        <button className='btn btn-primary btn-outline'>
                          <FaEdit />
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td>{department.name}</td>
                  <td>
                    {department.manager.firstName +
                      ' ' +
                      department.manager.lastName}
                  </td>
                  <td>
                    <button
                      className={`btn ${
                        department.status === 'active'
                          ? 'btn-success'
                          : 'btn-error'
                      } rounded-full`}
                      value={department._id}
                      type='submit'
                      onClick={(e) => submitHandler(e)}
                    >
                      {department.status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <NoData />
  );
}

export default DepartmentListTable;
