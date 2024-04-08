import React from "react";
import { observer } from "mobx-react";

function AddDataForm({ formStore }) {
  const handleSubmit = async () => {
    try {
      await formStore.createNewData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  );
}
export default observer(AddDataForm);
