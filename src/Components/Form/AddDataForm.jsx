import { observer } from "mobx-react";
import "./AddDataForm.scss";
import { convertImageToBase64, resetForm } from "../../Utils/tableUtils";

function AddDataForm({ formStore, tableData, makeData, inputs }) {
  if (!tableData.data || tableData.data.length === 0) {
    return null; // Returning null when there's no data
  }

  return (
    <form
      className="form-wrapper"
      onSubmit={async (e) => {
        e.preventDefault();
        const isValid = formStore.validateForm(inputs);
        if (isValid) {
          await formStore.createNewData();
          await tableData.getData();
          await resetForm(inputs);
        }
      }}
    >
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
                    {make.abrv}
                  </option>
                ))}
              </select>
            </div>
          ) : item.toLowerCase() === "logo" ||
            item.toLowerCase() === "image" ? (
            <div>
              <label>{item[0].toUpperCase() + item.slice(1)}:</label>
              <input
                type="file"
                accept="image/*"
                name={item}
                onChange={(e) =>
                  convertImageToBase64(e.target, (base64String) => {
                    formStore.getFormData(item, base64String);
                  })
                }
              />
            </div>
          ) : (
            <div>
              <label>{item[0].toUpperCase() + item.slice(1)}:</label>
              <input
                type="text"
                placeholder={`Enter ${item}..`}
                name={item}
                onChange={(e) =>
                  formStore.getFormData(e.target.name, e.target.value)
                }
              />
            </div>
          )}
        </div>
      ))}
      <button>Submit</button>
    </form>
  );
}

export default observer(AddDataForm);
