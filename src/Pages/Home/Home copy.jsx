import React from 'react';
import { inject, observer } from 'mobx-react';
import RootStore from '../../Store/RootStore';
import Table from '../../Components/Table/Table';
import FormField from '../../Components/Form/FormField';
import VehicleMakeStore from '../../Store/VehicleMakeStore';

function Home({ rootStore }) {
  const vehicleList = rootStore.vehicleModelStore.data;
  /* const makeList = rootStore.vehicleMakeStore.data; */
  const makeList = new VehicleMakeStore();
  console.log(makeList.data);

  const goToPage = async (pageNumber) => {
    await rootStore.vehicleModelStore.goToPage(pageNumber);
  };

  return (
    <>
      <div>Home</div>
      <FormField formData={rootStore.vehicleMakeFormStore} />
      <Table data={vehicleList} />
      <Table
        data={makeList}
        onDelete={(id) => rootStore.vehicleMakeFormStore.deleteData(id)}
      />
      <div>
        {rootStore.vehicleModelStore.data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
      {Array.from(
        { length: rootStore.vehicleModelStore.totalData },
        (_, i) => i + 1
      ).map((page) => (
        <button key={page} onClick={() => goToPage(page)}>
          {page}
        </button>
      ))}
    </>
  );
}

export default inject('rootStore')(observer(Home));
