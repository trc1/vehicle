import React from 'react';
import { observer } from 'mobx-react';
import TableMake from '../../Components/Table/TableMake';
import VehicleModelFormStore from '../../Store/VehicleModelFormStore';
import VehicleModelStore from '../../Store/VehicleModelStore';

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
function Home() {
  return (
    <>
      <div>Home</div>

      <TableMake
        vehicleData={vehicleModelData}
        onDelete={async (id) => {
          await vehicleModelFormStore.deleteData(id);
          await vehicleModelData.getData('fetchVehicleModels');
        }}
      />
    </>
  );
}

export default observer(Home);
