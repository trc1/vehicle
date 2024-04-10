import React from 'react';
import { observer } from 'mobx-react';
import UpdateForm from '../Form/UpdateForm';

function TableMake({ vehicleData, formStore, edit, makeData }) {
  if (!vehicleData.data || vehicleData.data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = !vehicleData ? null : Object.keys(vehicleData.data[0]);

  return (
    <>
      <table id='myTable'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicleData.data.map((item, index) => (
            <tr key={index}>
              <button
                onClick={async () => {
                  formStore.checkUpdatedValue(vehicleData.data, makeData.data);
                }}
              >
                Update Data
              </button>
              {headers.map((header) => (
                <td key={header}>
                  {header === 'image' || header === 'logo' ? (
                    <img src={item[header]} alt='' width={50} />
                  ) : (
                    <span>{item[header]}</span>
                  )}
                </td>
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
          ))}
        </tbody>
      </table>
      {formStore.modal ? (
        <UpdateForm data={formStore.selectedItem} formStore={formStore} />
      ) : null}
    </>
  );
}
export default observer(TableMake);
