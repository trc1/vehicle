import React from 'react';
import { observer } from 'mobx-react';

function TableMake({ vehicleData, onDelete }) {
  if (!vehicleData.data || vehicleData.data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = !vehicleData ? null : Object.keys(vehicleData.data[0]);

  return (
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
        {vehicleData.data.map((d, index) => (
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
              <button
                onClick={() => {
                  onDelete(d.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default observer(TableMake);
