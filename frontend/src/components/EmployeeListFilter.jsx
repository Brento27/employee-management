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

  const initialValues = {
    activeFilter: '',
    departmentFilter: { _id: '' },
    managerFilter: { _id: '' },
    pageSizeFilter: 10,
    currentPageFilter: 1,
    keyword: '',
  };
  const [filterValues, setfilterValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departmentFilter') {
      setfilterValues({ ...filterValues, [name]: JSON.parse(value) });
    } else if (name === 'managerFilter') {
      setfilterValues({ ...filterValues, [name]: JSON.parse(value) });
    } else {
      setfilterValues({ ...filterValues, [name]: value });
    }
    e.preventDefault();
  };

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userFilterList = useSelector((state) => state.userFilterList);
  const { usersFiltered } = userFilterList;

  const filterTable = async () => {
    await dispatch(
      filterListUsers(
        1,
        filterValues.pageSizeFilter,
        filterValues.activeFilter,
        filterValues.departmentFilter._id,
        filterValues.managerFilter._id
      )
    );
  };
  const resetTable = async () => {
    await dispatch(filterListUsers(1, filterValues.pageSizeFilter));
    setfilterValues({
      ...filterValues,
      activeFilter: '',
      departmentFilter: { _id: '' },
      managerFilter: { _id: '' },
    });
  };

  const selectCurrentPage = async (currentPage) => {
    setfilterValues({ ...filterValues, currentPageFilter: currentPage });
    console.log(currentPage);
    await dispatch(
      filterListUsers(
        currentPage,
        filterValues.pageSizeFilter,
        filterValues.activeFilter,
        filterValues.departmentFilter._id,
        filterValues.managerFilter._id,
        filterValues.keyword
      )
    );
  };
  const selectCurrentPageSize = async (pageSize) => {
    setfilterValues({ ...filterValues, pageSizeFilter: pageSize });

    await dispatch(
      filterListUsers(
        1,
        pageSize,
        filterValues.activeFilter,
        filterValues.departmentFilter._id,
        filterValues.managerFilter._id,
        filterValues.keyword
      )
    );
  };
  const handleSearch = async (keyword) => {
    setfilterValues({ ...filterValues, keyword: keyword });
    await dispatch(
      filterListUsers(
        1,
        filterValues.pageSizeFilter,
        filterValues.activeFilter,
        filterValues.departmentFilter._id,
        filterValues.managerFilter._id,
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
              onChange={handleChange}
              defaultValue=''
              name='activeFilter'
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
              onChange={handleChange}
              defaultValue=''
              name='departmentFilter'
            >
              <option value={JSON.stringify('')}>All</option>
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
              onChange={handleChange}
              className='select select-bordered max-w-xs border-primary w-80 border-2 bg-white'
              defaultValue=''
              name='managerFilter'
            >
              <option value={JSON.stringify('')}>All</option>
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
        }}
      />
    </>
  );
}

export default EmployeeListFilter;
