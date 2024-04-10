import React from 'react';
import AddDataForm from '../../Components/Form/AddDataForm';
import TableMake from '../../Components/Table/TableMake';
import VehicleMakeStore from '../../Store/VehicleMakeStore';
import VehicleModelStore from '../../Store/VehicleModelStore';
import VehicleModelFormStore from '../../Store/VehicleModelFormStore';

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
const vehicleMakeData = new VehicleMakeStore();
function VehicleModel() {
  return (
    <>
      <AddDataForm
        formStore={vehicleModelFormStore}
        tableData={vehicleModelData}
        makeData={vehicleMakeData}
      />
      <TableMake
        vehicleData={vehicleModelData}
        formStore={vehicleModelFormStore}
        edit={true}
        headers={['name', 'makeId']}
      />
    </>
  );
}

export default VehicleModel;
