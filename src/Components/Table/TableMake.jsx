import React from "react";
import { observer } from "mobx-react";
import UpdateForm from "../Form/UpdateForm";

function TableMake({ tableData, formStore, edit, makeData, headers }) {
  if (!tableData.data || tableData.data.length === 0) {
    return <div>No data available</div>;
  }

  // Function to extract headers from the data object
  const extractHeaders = (data) => {
    if (!data || data.length === 0 || !headers) return [];
    const dataObject = data[0];
    return Object.keys(dataObject).filter((header) => headers.includes(header));
  };

  // Extracting headers from tableData and makeData
  const vehicleHeaders = extractHeaders(tableData.data);
  const makeHeaders = makeData ? extractHeaders(makeData.data) : [];

  return (
    <>
      <table id="myTable">
        <thead>
          <tr>
            {vehicleHeaders.map((header) => (
              <th
                key={header}
                onClick={() => formStore.handleSort(header, tableData)}
              >
                {header}
              </th>
            ))}

            {makeHeaders.length > 0 &&
              makeHeaders.map((header) => (
                <th
                  key={header}
                  onClick={() => {
                    formStore.handleSort(header, makeData);
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
          {tableData.data.map((item, index) => {
            const make =
              makeData && makeData.data
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
            );
          })}
        </tbody>
      </table>
      {formStore.modal ? (
        <UpdateForm tableData={formStore.selectedItem} formStore={formStore} />
      ) : null}
    </>
  );
}

export default observer(TableMake);
