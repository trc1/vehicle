import { observer } from "mobx-react";
import { convertImageToBase64 } from "../../Utils/tableUtils";
import "./UpdateForm.scss";

function UpdateForm({ tableData, formStore }) {
  if (!tableData || Object.keys(tableData).length === 0) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formStore.updateData(tableData.id);
      }}
    >
      {Object.keys(tableData).map((item) => (
        <div key={item}>
          {item.toLowerCase() !== "makeid" && item.toLowerCase() !== "id" && (
            <>
              {item.toLowerCase() === "logo" ||
              item.toLowerCase() === "image" ? (
                <>
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) =>
                      convertImageToBase64(e.target, (base64String) => {
                        formStore.getEditedFormData(item, base64String);
                      })
                    }
                  />
                  {tableData[item] && (
                    <img
                      src={tableData[item]}
                      alt="Logo Preview"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  )}
                </>
              ) : (
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
            </>
          )}
        </div>
      ))}
      <button>Submit</button>
    </form>
  );
}

export default observer(UpdateForm);
