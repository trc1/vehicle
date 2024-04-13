import { observer } from "mobx-react";
import AddDataForm from "../../Components/Form/AddDataForm";
import TableMake from "../../Components/Table/TableMake";
import VehicleMakeFormStore from "../../Store/VehicleMakeFormStore";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import SearchForm from "../../Components/Form/SearchForm";
import Pagination from "../../Components/Pagination/Pagination";

const vehicleMakeData = new VehicleMakeStore();
const vehicleMakeFormStore = new VehicleMakeFormStore();

function VehicleMake() {
  return (
    <>
      <SearchForm tableData={vehicleMakeData} />
      <AddDataForm
        formStore={vehicleMakeFormStore}
        tableData={vehicleMakeData}
        inputs={["name", "abrv"]}
      />
      <TableMake
        tableData={vehicleMakeData}
        formStore={vehicleMakeFormStore}
        edit={true}
        headers={["name", "abrv"]}
      />
      <Pagination tableData={vehicleMakeData} />
    </>
  );
}

export default observer(VehicleMake);
