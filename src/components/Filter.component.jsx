import React from 'react';
import FilterDialog from './FilterDialog.component';
import PageFilter from './PageFilter.component';

export const Filter = () => {
  return (
    <div className='flex flex-row-reverse justify-start items-center'>
      <FilterDialog />
      <PageFilter />
    </div>
  )
};

export default Filter;