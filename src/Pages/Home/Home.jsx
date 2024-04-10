import React from 'react';
import { observer } from 'mobx-react';
import TableMake from '../../Components/Table/TableMake';
import VehicleModelFormStore from '../../Store/VehicleModelFormStore';
import VehicleModelStore from '../../Store/VehicleModelStore';
import VehicleMakeStore from '../../Store/VehicleMakeStore';

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
const vehicleMakeData = new VehicleMakeStore();
function Home() {
  console.log(vehicleMakeData);
  return (
    <>
      <div>Home</div>

      <TableMake
        vehicleData={vehicleModelData}
        formStore={vehicleModelFormStore}
        makeData={vehicleMakeData}
        headers={['name', 'makeId', 'abrv', 'make']}
      />
    </>
  );
}
export default observer(Home);
