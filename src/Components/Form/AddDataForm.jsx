import { observer } from "mobx-react";
import "./AddDataForm.scss";

function AddDataForm({ formStore, tableData, makeData, inputs }) {
  if (!tableData.data || tableData.data.length === 0) {
    return null; // Returning null when there's no data
  }

  return (
    <form className="form-wrapper">
      {inputs.map((item) => (
        <div key={item}>
          {item.toLowerCase() === "makeid" ? (
            <div>
              <label>{item[0].toUpperCase() + item.slice(1)}:</label>
              <select
                name={item}
                onChange={(e) => {
                  formStore.handleSelect(item, e.target.value, makeData);
                }}
              >
                <option value="">Select a make</option>
                {makeData.data.map((make) => (
                  <option key={make.id} value={make.id}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label>{item[0].toUpperCase() + item.slice(1)}:</label>
              <input
                type="text"
                placeholder={`Enter ${item}..`}
                name={item}
                onChange={(e) => formStore.getFormData(item, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          formStore.createNewData();
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default observer(AddDataForm);
