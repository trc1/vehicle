import { observer } from "mobx-react";
import TableMake from "../../Components/Table/TableMake";
import VehicleModelFormStore from "../../Store/VehicleModelFormStore";
import VehicleModelStore from "../../Store/VehicleModelStore";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import SearchForm from "../../Components/Form/SearchForm";
import Pagination from "../../Components/Pagination/Pagination";
import Logo from "../../Components/Logo/Logo";

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
const vehicleMakeData = new VehicleMakeStore();

function Home() {
  return (
    <>
      {vehicleMakeData.loading ? (
        <Logo width={500} />
      ) : (
        <>
          <SearchForm tableData={vehicleModelData} makeData={vehicleMakeData} />
          <TableMake
            tableData={vehicleModelData}
            makeData={vehicleMakeData}
            formStore={vehicleModelFormStore}
            headers={["model", "makeId", "abrv", "name"]}
          />
          <Pagination tableData={vehicleModelData} />
        </>
      )}
    </>
  );
}
export default observer(Home);
