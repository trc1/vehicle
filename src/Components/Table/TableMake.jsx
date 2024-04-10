import React from 'react';
import { observer } from 'mobx-react';
import UpdateForm from '../Form/UpdateForm';

function TableMake({ tableData, formStore, edit, headers }) {
  if (!tableData.data || tableData.data.length === 0) {
    return <div>No data available</div>;
  }

  const handleSort = (header, dataStore) => {
    const newSortBy = header.toLowerCase();
    dataStore.setSortOrder((dataStore.sortBy = newSortBy));
    dataStore.dataParams.sort = `${newSortBy}|${dataStore.sortOrder}`;
    dataStore.getData();
  };

  return (
    <>
      <table id='myTable'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                onClick={() => {
                  handleSort(header, tableData);
                }}
              >
                {header}
              </th>
            ))}
            {edit && <th>Edit</th>}
            {edit && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {tableData.data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  <span>{item[header]}</span>
                </td>
              ))}
              {edit && (
                <>
                  <td>
                    <button onClick={() => formStore.openModal(item)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        await formStore.deleteData(item.id);
                        await tableData.getData();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {formStore.modal && (
        <UpdateForm data={formStore.selectedItem} formStore={formStore} />
      )}
    </>
  );
}

export default observer(TableMake);
