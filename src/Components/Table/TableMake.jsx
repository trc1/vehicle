import React from 'react';
import { observer } from 'mobx-react';
import UpdateForm from '../Form/UpdateForm';

function TableMake({ vehicleData, formStore, edit, makeData, headers }) {
  if (!vehicleData.data || vehicleData.data.length === 0) {
    return <div>No data available</div>;
  }

  // Function to extract headers from the data object
  const extractHeaders = (data) => {
    if (!data || data.length === 0 || !headers) return [];
    const dataObject = data[0];
    return Object.keys(dataObject).filter((header) => headers.includes(header));
  };

  // Extracting headers from vehicleData and makeData
  const vehicleHeaders = extractHeaders(vehicleData.data);
  const makeHeaders = makeData ? extractHeaders(makeData.data) : [];

  return (
    <>
      <table id='myTable'>
        <thead>
          <tr>
            {vehicleHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {/* Add headers for makeData if needed */}
            {makeHeaders.length > 0 &&
              makeHeaders.map((header) => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {vehicleData.data.map((item, index) => {
            const make = makeData
              ? makeData.data.find((make) => make.id === item.makeId)
              : null;

            return (
              <tr key={index}>
                {vehicleHeaders.map((header) => (
                  <td key={header}>
                    <span>{item[header]}</span>
                  </td>
                ))}
                {makeHeaders.length > 0 &&
                  make &&
                  makeHeaders.map((header) => (
                    <td key={header}>{make[header]}</td>
                  ))}
                {edit && (
                  <>
                    <td>
                      <button
                        onClick={() => {
                          formStore.openModal(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={async () => {
                          await formStore.deleteData(item.id);
                          await vehicleData.getData();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {formStore.modal ? (
        <UpdateForm data={formStore.selectedItem} formStore={formStore} />
      ) : null}
    </>
  );
}

export default observer(TableMake);
