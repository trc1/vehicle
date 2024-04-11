import { observer } from "mobx-react";
import TableMake from "../../Components/Table/TableMake";
import VehicleModelFormStore from "../../Store/VehicleModelFormStore";
import VehicleModelStore from "../../Store/VehicleModelStore";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import SearchForm from "../../Components/Form/SearchForm";

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
const vehicleMakeData = new VehicleMakeStore();

function Home() {
  return (
    <>
      <div>Home</div>
      <SearchForm tableData={vehicleModelData} />
      <TableMake
        tableData={vehicleModelData}
        makeData={vehicleMakeData}
        formStore={vehicleModelFormStore}
        headers={["model", "makeId", "abrv", "name"]}
      />
    </>
  );
}
export default observer(Home);
