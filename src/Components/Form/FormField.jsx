import { inject, observer } from 'mobx-react';
import React from 'react';

function FormField({ rootStore }) {
  const formData = rootStore.vehicleMakeFormStore;
  return (
    <form>
      <input
        type='text'
        placeholder='Vehicle Name..'
        name='name'
        onChange={(e) => {
          formData.getFormData(e.target.name, e.target.value);
        }}
      />
      <input
        type='text'
        placeholder='Abrv..'
        name='abrv'
        onChange={(e) => {
          formData.getFormData(e.target.name, e.target.value);
        }}
      />
      <input
        type='file'
        name='logo'
        onChange={(e) => {
          formData.convertImageToBase64(e.target, (base64String) => {
            formData.getFormData(e.target.name, base64String);
          });
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          formData.createNewData(formData.formData);
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default inject('rootStore')(observer(FormField));
