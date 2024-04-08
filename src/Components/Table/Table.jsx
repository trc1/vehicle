import React from 'react';
import './Table.css';
import { inject, observer } from 'mobx-react';

function Table({ tableData, onDelete }) {
  if (!tableData || tableData.length === 0) {
    return <div>No data available</div>;
  }
  const headers = Object.keys(tableData[0]);
  return (
    <>
      <div>Table</div>
      <table id='myTable'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((d, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  {header === 'image' || header === 'logo' ? (
                    <img src={d[header]} alt='' width={50} />
                  ) : (
                    <span>{d[header]}</span>
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => onDelete(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default observer(Table);
