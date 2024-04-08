import React, { useState } from 'react';
import { observer } from 'mobx-react';

function AddDataForm({ formStore }) {
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [logo, setLogo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async () => {
    // Prevent multiple submissions while processing
    if (submitting) return;

    setSubmitting(true);

    try {
      // Convert image to base64 before sending
      const convertImageToBase64 = (fileInput, callback) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64String = e.target.result;
          callback(base64String);
        };
        reader.readAsDataURL(fileInput);
      };

      convertImageToBase64(logo, async (base64String) => {
        await formStore.getFormData('name', name);
        await formStore.getFormData('abrv', abrv);
        await formStore.getFormData('logo', base64String);
        await formStore.createNewData();

        // Reset form fields after successful submission
        setName('');
        setAbrv('');
        setLogo(null);
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Abbreviation:</label>
        <input
          type='text'
          value={abrv}
          onChange={(e) => setAbrv(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Logo:</label>
        <input type='file' onChange={handleFileChange} required />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
export default observer(AddDataForm);
