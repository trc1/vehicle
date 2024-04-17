import { useState } from "react";
import { observer } from "mobx-react";
import UpdateForm from "../Form/UpdateForm";
import Sort from "../Icons/Sort";
import {
  handleImageClick,
  extractHeaders,
  handleSort,
} from "../../Utils/tableUtils";
import "./TableMake.scss";
import Loader from "../Loader/Loader";

function TableMake({ tableData, formStore, edit, makeData, headers }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!tableData.data || tableData.data.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table__headers">
            {(() => {
              const vehicleHeaders = extractHeaders(tableData.data, headers);
              return vehicleHeaders.map((header) => (
                <th key={header} onClick={() => handleSort(header, tableData)}>
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
                const makeHeaders = extractHeaders(makeData.data, headers);
                return makeHeaders.map((header) => (
                  <th key={header} onClick={() => handleSort(header, makeData)}>
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
                  const vehicleHeaders = extractHeaders(
                    tableData.data,
                    headers
                  );
                  return vehicleHeaders.map((header) => (
                    <td
                      key={header}
                      onClick={() => handleImageClick(item, setSelectedImage)}
                    >
                      {header.includes("logo") || header.includes("image") ? (
                        <img
                          src={item[header]}
                          alt={item["model"]}
                          className="table__logo"
                        />
                      ) : (
                        <span>{item[header]}</span>
                      )}
                    </td>
                  ));
                })()}

                {makeData &&
                  makeData.data &&
                  make &&
                  (() => {
                    const makeHeaders = extractHeaders(makeData.data, headers);
                    return makeHeaders.map((header) => (
                      <td key={header}>
                        {header.includes("logo") ? (
                          <img
                            src={make[header]}
                            alt={make["name"]}
                            className="table__logo"
                          />
                        ) : (
                          <span>{make[header]}</span>
                        )}
                      </td>
                    ));
                  })()}

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
      {selectedImage && (
        <div className="image-wrapper" onClick={() => setSelectedImage(null)}>
          <div>
            <img src={selectedImage} alt="Selected Image" />
            <span className="close"></span>
          </div>
        </div>
      )}
    </>
  );
}

export default observer(TableMake);
