import React from 'react';
import { observer } from 'mobx-react';
function AddDataForm({ formStore, tableData, makeData }) {
  if (!tableData.data || tableData.data.length === 0) {
    return null; // Returning null when there's no data
  }

  const inputs = Object.keys(tableData.data[0]).filter(
    (key) => key.toLowerCase() !== 'id'
  );

  const handleClick = async () => {
    await formStore.createNewData();
  };

  const handleChange = (key, value) => {
    formStore.getFormData(key, value);
  };

  return (
    <form method='#'>
      {inputs.map((key) => (
        <div key={key}>
          {key.toLowerCase() === 'makeid' ? (
            <div>
              <label>{key[0].toUpperCase() + key.slice(1)}:</label>
              <select
                name={key}
                onChange={(e) => handleChange(key, e.target.value)}
              >
                <option value=''>Select a make</option>
                {makeData.data.map((make) => (
                  <option key={make.id} value={make.makeId}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label>{key[0].toUpperCase() + key.slice(1)}:</label>
              <input
                type='text'
                placeholder={`Enter ${key}..`}
                name={key}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <button type='submit' onClick={handleClick}>
        Submit
      </button>
    </form>
  );
}

export default observer(AddDataForm);
