import React, { useState } from "react";
import { observer } from "mobx-react";

function AddDataForm({ formStore }) {
  const [name, setName] = useState("");
  const [abrv, setAbrv] = useState("");

  const handleSubmit = async () => {
    try {
      await formStore.getFormData("name", name);
      await formStore.getFormData("abrv", abrv);
      await formStore.createNewData();

      // Reset form fields after successful submission
      setName("");
      setAbrv("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Abbreviation:</label>
        <input
          type="text"
          value={abrv}
          onChange={(e) => setAbrv(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default observer(AddDataForm);
