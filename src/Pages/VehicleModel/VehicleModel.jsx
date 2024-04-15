import { observer } from "mobx-react";
import AddDataForm from "../../Components/Form/AddDataForm";
import TableMake from "../../Components/Table/TableMake";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import VehicleModelStore from "../../Store/VehicleModelStore";
import VehicleModelFormStore from "../../Store/VehicleModelFormStore";
import SearchForm from "../../Components/Form/SearchForm";
import Pagination from "../../Components/Pagination/Pagination";

function VehicleModel() {
  const vehicleModelData = new VehicleModelStore();
  const vehicleModelFormStore = new VehicleModelFormStore();
  const vehicleMakeData = new VehicleMakeStore();

  return (
    <>
      <SearchForm tableData={vehicleModelData} />
      <AddDataForm
        formStore={vehicleModelFormStore}
        tableData={vehicleModelData}
        makeData={vehicleMakeData}
        inputs={["model", "makeId", "image"]}
      />
      <TableMake
        tableData={vehicleModelData}
        formStore={vehicleModelFormStore}
        edit={true}
        headers={["model", "makeId", "image"]}
      />
      <Pagination tableData={vehicleModelData} />
    </>
  );
}

export default observer(VehicleModel);
