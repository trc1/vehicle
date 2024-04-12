import { observer } from "mobx-react";
import UpdateForm from "../Form/UpdateForm";
import "./TableMake.scss";
import Sort from "../Icons/Sort";

function TableMake({ tableData, formStore, edit, makeData, headers }) {
  if (!tableData.data || tableData.data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table__headers">
            {(() => {
              const vehicleHeaders = formStore.extractHeaders(
                tableData.data,
                headers
              );
              return vehicleHeaders.map((header) => (
                <th
                  key={header}
                  onClick={() => formStore.handleSort(header, tableData)}
                >
                  <div>{header}</div>
                  <span>
                    <Sort />
                  </span>
                </th>
              ));
            })()}

            {makeData &&
              makeData.data &&
              makeData.data.length > 0 &&
              (() => {
                const makeHeaders = formStore.extractHeaders(
                  makeData.data,
                  headers
                );
                return makeHeaders.map((header) => (
                  <th
                    key={header}
                    onClick={() => formStore.handleSort(header, makeData)}
                  >
                    {header}
                  </th>
                ));
              })()}

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
                {(() => {
                  const vehicleHeaders = formStore.extractHeaders(
                    tableData.data,
                    headers
                  );
                  return vehicleHeaders.map((header) => (
                    <td key={header}>
                      <span>{item[header]}</span>
                    </td>
                  ));
                })()}

                {makeData &&
                  makeData.data &&
                  make &&
                  (() => {
                    const makeHeaders = formStore.extractHeaders(
                      makeData.data,
                      headers
                    );
                    return makeHeaders.map((header) => (
                      <td key={header}>{make[header]}</td>
                    ));
                  })()}

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
