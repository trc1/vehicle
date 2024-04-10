import { observer } from "mobx-react";

const UpdateForm = ({ tableData, formStore }) => {
  if (!tableData || Object.keys(tableData).length === 0) {
    return null;
  }

  return (
    <form>
      {Object.keys(tableData).map((item) => (
        <div key={item}>
          {item.toLowerCase() !== "makeid" && item.toLowerCase() !== "id" && (
            <>
              <label>{item}</label>
              <input
                type="text"
                value={tableData[item]}
                onChange={(e) =>
                  formStore.getEditedFormData(item, e.target.value)
                }
              />
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          formStore.updateData(tableData.id);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default observer(UpdateForm);
