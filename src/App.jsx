import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import VehicleMake from './Pages/VehicleMake/VehicleMake';
import VehicleModel from './Pages/VehicleModel/VehicleModel';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='/vehicleMake' element={<VehicleMake />} />
          <Route path='/vehicleModel' element={<VehicleModel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
