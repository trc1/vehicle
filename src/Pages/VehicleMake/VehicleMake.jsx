import React from 'react';
import AddDataForm from '../../Components/Form/AddDataForm';
import TableMake from '../../Components/Table/TableMake';
import { observer } from 'mobx-react';
import VehicleMakeFormStore from '../../Store/VehicleMakeFormStore';
import VehicleMakeStore from '../../Store/VehicleMakeStore';

const vehicleMakeData = new VehicleMakeStore();
const vehicleMakeFormStore = new VehicleMakeFormStore();
function VehicleMake() {
  return (
    <div>
      <AddDataForm
        formStore={vehicleMakeFormStore}
        tableData={vehicleMakeData}
      />
      <TableMake
        vehicleData={vehicleMakeData}
        formStore={vehicleMakeFormStore}
        edit={true}
      />
    </div>
  );
}

export default observer(VehicleMake);
