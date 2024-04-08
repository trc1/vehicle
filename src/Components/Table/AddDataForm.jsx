import React from "react";
import { observer } from "mobx-react";

function AddDataForm({ formStore }) {
  const handleClick = async () => {
    try {
      await formStore.createNewData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Vehicle Name.."
          name="name"
          onChange={(e) => {
            formStore.getFormData(e.target.name, e.target.value);
          }}
        />
      </div>
      <div>
        <label>Abbreviation:</label>
        <input
          type="text"
          placeholder="Abrv.."
          name="abrv"
          onChange={(e) => {
            formStore.getFormData(e.target.name, e.target.value);
          }}
        />
      </div>
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
export default observer(AddDataForm);
