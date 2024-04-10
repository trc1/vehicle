import React, { useState } from 'react';
import { observer } from 'mobx-react';

function UpdateForm({ data, formStore }) {
  if (!data || Object.keys(data).length === 0) {
    return null; // Return null or another fallback component if data is null or empty
  }
  const handleChange = (e, item) => {
    const { value } = e.target;
    formStore.getEditedFormData(item, value);
  };
  const renderInputs = () => {
    return Object.keys(data).map((item) => (
      <div key={item}>
        <label>{item}</label>
        <input
          type='text'
          value={data[item]}
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
