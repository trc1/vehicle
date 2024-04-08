import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import VehicleMake from './Pages/VehicleMake/VehicleMake';
import VehicleModel from './Pages/VehicleModel/VehicleModel';
import VehicleMakeStore from './Store/VehicleMakeStore';
import { observer } from 'mobx-react';
import VehicleMakeFormStore from './Store/VehicleMakeFormStore';

function App() {
  const vehicleMakeData = new VehicleMakeStore();
  const vehicleMakeFormStore = new VehicleMakeFormStore();

  return (
    <>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <Home
                vehicleMakeData={vehicleMakeData}
                vehicleMakeFormStore={vehicleMakeFormStore}
              />
            }
          />
          <Route path='/vehicleMake' element={<VehicleMake />} />
          <Route path='/vehicleModel' element={<VehicleModel />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);
