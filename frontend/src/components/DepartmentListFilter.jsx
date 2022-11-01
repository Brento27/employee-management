import React, { useState } from 'react';
import { listDepartmentsfilter } from '../actions/departmentActions';
import { useSelector, useDispatch } from 'react-redux';
import DepartmentListTable from './DepartmentListTable';
import PerPageAndSearchDepartment from './PerPageAndSearchDepartment';
import PaginationDepartment from './PaginationDepartment';

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
  return (
    <>
      <div className='border-2 border-fuchsia-700 mt-5 w-full flex flex-col p-4 gap-4'>
        <p className='absolute top-40 left-45 bg-default px-2'>filters</p>
        <div className='flex gap-6 items-center justify-between'>
          <p>Status</p>
          <select
            className='select select-accent w-full max-w-xs'
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
          <button className='btn btn-accent w-24' onClick={filterTable}>
            Filter
          </button>
          <button className='btn btn-secondary w-24' onClick={resetTable}>
            Reset
          </button>
        </div>
      </div>
      <PerPageAndSearchDepartment
        selectPageSize={(pageSize) => {
          setPageSizeFilter(pageSize);
        }}
      />
      <DepartmentListTable />
      <PaginationDepartment
        selectCurrentPage={(currentPage) => {
          selectCurrentPage(currentPage);
          console.log(currentPage);
        }}
      />
    </>
  );
}

export default DepartmentListFilter;
