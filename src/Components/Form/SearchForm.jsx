import React from 'react';

function SearchForm({ tableData }) {
  return (
    <div>
      <input
        type='text'
        placeholder='Search here...'
        onChange={(e) => tableData.setTableFilter(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
