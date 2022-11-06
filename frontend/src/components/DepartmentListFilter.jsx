import React, { useState } from 'react';
import { listDepartmentsfilter } from '../actions/departmentActions';
import { useSelector, useDispatch } from 'react-redux';
import DepartmentListTable from './DepartmentListTable';
import PerPageAndSearchDepartment from './PerPageAndSearchDepartment';
import PaginationDepartment from './PaginationDepartment';
import { FaFilter } from 'react-icons/fa';
import Menu from './Menu';

function DepartmentListFilter() {
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState('');
  const [pageSizeFilter, setPageSizeFilter] = useState(10);

  const filterTable = () => {
    dispatch(listDepartmentsfilter(1, pageSizeFilter, activeFilter));
  };
  const resetTable = () => {
    setActiveFilter('');
    dispatch(listDepartmentsfilter(1, pageSizeFilter, activeFilter));
  };

  const selectCurrentPage = (currentPage) => {
    dispatch(listDepartmentsfilter(currentPage, pageSizeFilter, activeFilter));
  };
  const selectCurrentPageSize = (pageSize) => {
    setPageSizeFilter(pageSize);
    dispatch(listDepartmentsfilter(1, pageSize, activeFilter));
  };
  return (
    <>
      <div className='px-6 h-full flex gap-4'>
        <Menu />
        <div className='border-2 rounded-2xl border-primary w-full flex flex-col p-4 gap-4 bg-white'>
          <p className='text-3xl'>Departments</p>
          <div className='flex gap-6 items-center justify-between'>
            <p>Status</p>
            <select
              className='select select-primary w-full max-w-xs'
              onChange={(e) => {
                setActiveFilter(e.target.value);
              }}
            >
              <option value=''>All</option>
              <option value='active'>Active</option>
              <option value='deactive'>Deactive</option>
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
      <PerPageAndSearchDepartment
        selectPageSize={(pageSize) => {
          selectCurrentPageSize(pageSize);
        }}
      />
      <DepartmentListTable />

      <PaginationDepartment
        selectCurrentPage={(currentPage) => {
          selectCurrentPage(currentPage);
        }}
      />
    </>
  );
}

export default DepartmentListFilter;
