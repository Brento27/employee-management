import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function PaginationDepartment({ selectCurrentPage }) {
  const [selectedPage, setSelectedPage] = useState(1);
  const departmentListFilter = useSelector(
    (state) => state.departmentListFilter
  );
  const { pages } = departmentListFilter;

  let buttonArray = [];

  for (let index = 0; index < pages; index++) {
    buttonArray[index] = index + 1;
  }

  return pages > 1 ? (
    <div className='btn-group px-6 mb-6 '>
      {buttonArray.map((x) => (
        <button
          className={`btn ${selectedPage == x && 'btn-active'}`}
          value={x}
          onClick={(e) => {
            selectCurrentPage(e.target.value);
            setSelectedPage(x);
          }}
        >
          {x}
        </button>
      ))}
    </div>
  ) : (
    <div className='my-32'></div>
  );
}

export default PaginationDepartment;
