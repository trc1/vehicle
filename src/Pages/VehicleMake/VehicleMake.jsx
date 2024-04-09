import React from 'react';
import AddDataForm from '../../Components/Table/AddDataForm';
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
        onDelete={async (id) => {
          await vehicleMakeFormStore.deleteData(id);
          await vehicleMakeData.getData('fetchVehicleMakes');
        }}
      />
    </div>
  );
}

export default observer(VehicleMake);
