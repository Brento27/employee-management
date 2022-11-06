import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterListUsers } from '../actions/userActions';
import EmployeeListTable from './EmployeeListTable';
import PaginationEmployee from './PaginationEmployee';
import PerPageAndSearchEmployee from './PerPageAndSearchEmployee';
import { FaFilter } from 'react-icons/fa';
import Menu from './Menu';

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
  const selectCurrentPageSize = (pageSize) => {
    setPageSizeFilter(pageSize);

    dispatch(
      filterListUsers(
        1,
        pageSize,
        activeFilter,
        departmentFilter._id,
        managerFilter._id
      )
    );
  };
  const handleSearch = (keyword) => {
    dispatch(
      filterListUsers(
        1,
        pageSizeFilter,
        activeFilter,
        departmentFilter._id,
        managerFilter._id,
        keyword
      )
    );
  };

  useEffect(() => {}, [users, usersFiltered]);

  return (
    <>
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='border-2 border-primary rounded-xl w-full h-fit flex flex-col p-4 gap-4 bg-white'>
          <p className='text-3xl'>Employees</p>
          <div className='flex gap-6 items-center justify-between'>
            <p>Status</p>
            <select
              className='select select-bordered border-primary w-80 border-2 bg-white'
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
              className='select select-bordered border-primary w-80 border-2 bg-white'
              onChange={(e) => {
                setDepartmentFilter(JSON.parse(e.target.value));
              }}
            >
              <option value=''>All</option>
              {departments?.map((department) => {
                return (
                  <option
                    key={department._id}
                    value={JSON.stringify(department)}
                  >
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
              className='select select-bordered max-w-xs border-primary w-80 border-2 bg-white'
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
            <button className='btn btn-primary gap-2' onClick={filterTable}>
              <FaFilter /> Filter
            </button>
            <button className='btn btn-outline w-24' onClick={resetTable}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <PerPageAndSearchEmployee
        selectPageSize={(pageSize) => selectCurrentPageSize(pageSize)}
        handleSearch={(keyword) => {
          handleSearch(keyword);
        }}
      />
      <div className='overflow-x-auto mt-4 px-6'>
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
