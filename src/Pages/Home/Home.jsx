import React from "react";
import { inject, observer } from "mobx-react";
import Table from "../../Components/Table/Table";
import VehicleMakeStore from "../../Store/VehicleMakeStore";
import VehicleModelStore from "../../Store/VehicleModelStore";
import VehicleModelFormStore from "../../Store/VehicleModelFormStore";
import VehicleMakeFormStore from "../../Store/VehicleMakeFormStore";
import AddDataForm from "../../Components/Table/AddDataForm";
import TableMake from "../../Components/Table/TableMake";
import { runInAction } from "mobx";

function Home({ vehicleMakeData, vehicleMakeFormStore }) {
  return (
    <>
      <div>Home</div>
      <AddDataForm formStore={vehicleMakeFormStore} />
      {/*  <Table data={vehicleModelStore.data} /> */}
      <TableMake
        vehicleData={vehicleMakeData.data}
        formStore={vehicleMakeFormStore}
        onDelete={async (id) => {
          try {
            await vehicleMakeFormStore.deleteData(id);
            await vehicleMakeData.getData();
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        }}
      />

      {/*       <Table
        tableData={vehicleMakeData.data.item}
        onDelete={(id) => {
          vehicleMakeFormStore.deleteData(id);
        }}
      /> */}
    </>
  );
}

export default observer(Home);
