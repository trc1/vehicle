import React from 'react';
import AddDataForm from '../../Components/Form/AddDataForm';
import TableMake from '../../Components/Table/TableMake';
import VehicleMakeStore from '../../Store/VehicleMakeStore';
import VehicleModelStore from '../../Store/VehicleModelStore';
import VehicleModelFormStore from '../../Store/VehicleModelFormStore';
import SearchForm from '../../Components/Form/SearchForm';

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
const vehicleMakeData = new VehicleMakeStore();
function VehicleModel() {
  return (
    <>
      <SearchForm tableData={vehicleModelData} />
      <AddDataForm
        formStore={vehicleModelFormStore}
        tableData={vehicleModelData}
        makeData={vehicleMakeData}
        headers={['model', 'makeId']}
      />
      <TableMake
        tableData={vehicleModelData}
        formStore={vehicleModelFormStore}
        edit={true}
        headers={['name', 'makeId', 'make', 'make-abrv']}
      />
    </>
  );
}

export default VehicleModel;
