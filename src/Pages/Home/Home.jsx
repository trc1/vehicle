import { observer } from "mobx-react";
import TableMake from "../../Components/Table/TableMake";
import VehicleModelFormStore from "../../Store/VehicleModelFormStore";
import VehicleModelStore from "../../Store/VehicleModelStore";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import SearchForm from "../../Components/Form/SearchForm";
import Pagination from "../../Components/Pagination/Pagination";

function Home() {
  const vehicleModelData = new VehicleModelStore();
  const vehicleModelFormStore = new VehicleModelFormStore();
  const vehicleMakeData = new VehicleMakeStore();

  return (
    <>
      <SearchForm tableData={vehicleModelData} />
      <TableMake
        tableData={vehicleModelData}
        makeData={vehicleMakeData}
        formStore={vehicleModelFormStore}
        headers={["model", "logo", "abrv", "name", "image"]}
      />
      <Pagination tableData={vehicleModelData} />
    </>
  );
}
export default observer(Home);
