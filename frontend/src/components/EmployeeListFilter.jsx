import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterListUsers } from '../actions/userActions';
import EmployeeListTable from './EmployeeListTable';
import PaginationEmployee from './PaginationEmployee';
import PerPageAndSearchEmployee from './PerPageAndSearchEmployee';

function EmployeeListFilter() {
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState({ _id: '' });
  const [managerFilter, setManagerFilter] = useState({ _id: '' });
  const [pageSizeFilter, setPageSizeFilter] = useState(10);
  const [currentPageFilter, setCurrentPageFilter] = useState(1);

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userFilterList = useSelector((state) => state.userFilterList);
  const { usersFiltered } = userFilterList;

  const filterTable = () => {
    dispatch(
      filterListUsers(
        1,
        pageSizeFilter,
        activeFilter,
        departmentFilter._id,
        managerFilter._id
      )
    );
  };
  const resetTable = () => {
    setActiveFilter('');
    setDepartmentFilter({});
    setManagerFilter({});
    dispatch(filterListUsers());
  };

  const selectCurrentPage = (currentPage) => {
    setCurrentPageFilter(currentPage);

    dispatch(
      filterListUsers(
        currentPage,
        pageSizeFilter,
        activeFilter,
        departmentFilter._id,
        managerFilter._id
      )
    );
  };

  useEffect(() => {}, [users, usersFiltered]);

  return (
    <>
      <div className='border-2 border-fuchsia-700 mt-5 w-full h-72 flex flex-col p-4 gap-4'>
        <p className='absolute top-40 left-45 bg-default px-2'>filters</p>
        <div className='flex gap-6 items-center justify-between'>
          <p>Status</p>
          <select
            className='select select-accent w-80'
            onChange={(e) => {
              setActiveFilter(e.target.value);
            }}
          >
            <option value=''>All</option>
            <option value='active'>Active</option>
            <option value='deactive'>Deactive</option>
          </select>
        </div>
        <div className='flex gap-6 items-center justify-between'>
          <p>Departments</p>
          <select
            className='select select-accent w-80'
            onChange={(e) => {
              setDepartmentFilter(JSON.parse(e.target.value));
            }}
          >
            <option value=''>All</option>
            {departments?.map((department) => {
              return (
                <option key={department._id} value={JSON.stringify(department)}>
                  {department.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='flex gap-6 items-center justify-between'>
          <p>Manager</p>
          <select
            onChange={(e) => {
              setManagerFilter(JSON.parse(e.target.value));
            }}
            className='select select-accent w-full max-w-xs'
          >
            <option value=''>All</option>
            {users
              ?.filter((user) => user.isManager === true)
              .map((user) => {
                return (
                  <option key={user._id} value={JSON.stringify(user)}>
                    {user.firstName + ' ' + user.lastName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className='flex justify-between'>
          <button className='btn btn-accent w-24' onClick={filterTable}>
            Filter
          </button>
          <button className='btn btn-secondary w-24' onClick={resetTable}>
            Reset
          </button>
        </div>
      </div>
      <PerPageAndSearchEmployee
        selectPageSize={(pageSize) => setPageSizeFilter(pageSize)}
      />
      <div className='overflow-x-auto mt-4'>
        <EmployeeListTable />
      </div>
      <PaginationEmployee
        selectCurrentPage={(currentPage) => {
          selectCurrentPage(currentPage);
          console.log(currentPage);
        }}
      />
    </>
  );
}

export default EmployeeListFilter;
