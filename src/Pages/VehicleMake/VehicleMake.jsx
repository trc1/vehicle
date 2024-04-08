import React from 'react';
import Table from '../../Components/Table/Table';
import { inject, observer } from 'mobx-react';
import FormField from '../../Components/Form/FormField';

function VehicleMake({ rootStore }) {
  let vehicleMakeData = rootStore.vehicleMakeStore.data;
  return (
    <>
      <FormField />
      <Table
        data={vehicleMakeData}
        onDelete={(id) => rootStore.vehicleMakeFormStore.deleteData(id)}
      />
    </>
  );
}

export default inject('rootStore')(observer(VehicleMake));
