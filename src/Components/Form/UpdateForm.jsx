import React, { useState } from 'react';
import { observer } from 'mobx-react';

function UpdateForm({ data, formStore }) {
  const [formData, setFormData] = useState(data); // Initialize formData state with the initial data

  const handleChange = (e, item) => {
    const { value } = e.target;
    setFormData({ ...formData, [item]: value }); // Update formData state with the new value
    formStore.getEditedFormData(item, value);
  };
  const renderInputs = () => {
    return Object.keys(data).map((item) => (
      <div key={item}>
        <label>{item}</label>
        <input
          type='text'
          value={formData[item]} // Use formData state here
          onChange={(e) => handleChange(e, item)}
        />
      </div>
    ));
  };

  const handleSubmit = async () => {
    await formStore.updateData(data.id);
  };

  return (
    <div>
      {renderInputs()} <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default observer(UpdateForm);
