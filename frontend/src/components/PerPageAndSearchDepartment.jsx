import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { listDepartmentsfilter } from '../actions/departmentActions';

function PerPageAndSearchDepartment({ selectPageSize }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    selectPageSize(e.target.value);
  };
  const searchHandler = () => {
    dispatch(listDepartmentsfilter(1, 10, '', search));
    setSearch('');
  };
  return (
    <div className='flex justify-between mt-4 px-6'>
      <div className='flex gap-6 items-center'>
        <p>Show per Page</p>
        <select
          className='select select-primary'
          defaultValue={10}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value='all'>(All)</option>
        </select>
      </div>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Search name…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='input input-bordered input-primary'
          />
          <button
            className='btn btn-square border-1 border-primary btn-primary'
            onClick={searchHandler}
          >
            <BiSearchAlt size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerPageAndSearchDepartment;
