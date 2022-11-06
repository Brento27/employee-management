import React from 'react';
import { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateDepartment } from '../actions/departmentActions';

function DepartmentListTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departmentListFilter = useSelector(
    (state) => state.departmentListFilter
  );
  const { departmentsfiltered, loadingDepartment } = departmentListFilter;

  useEffect(() => {}, departmentsfiltered);

  const submitHandler = (e) => {
    const department = departmentsfiltered.filter(
      (department) => department._id == e.target.value
    )[0];
    console.log(department);
    if (department.status === 'active') {
      dispatch(
        updateDepartment({
          _id: department._id,
          status: 'deactive',
        })
      );
    } else {
      dispatch(
        updateDepartment({
          _id: department._id,
          status: 'active',
        })
      );
    }

    navigate('/');

    e.preventDefault();
  };
  return loadingDepartment ? (
    <p className='text-4xl mt-40 ml-40'>Loading...</p>
  ) : (
    <div className='overflow-x-auto my-4 px-6'>
      <div className='border-2 border-primary rounded-xl p-1 mb-4 '>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
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
                    <div className='flex gap-2'>
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
  );
}

export default DepartmentListTable;
