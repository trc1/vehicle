import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TableMake from '../../Components/Table/TableMake';
import VehicleModelFormStore from '../../Store/VehicleModelFormStore';
import VehicleModelStore from '../../Store/VehicleModelStore';
import UpdateForm from '../../Components/Form/UpdateForm';

const vehicleModelData = new VehicleModelStore();
const vehicleModelFormStore = new VehicleModelFormStore();
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: null, data: null });

  const handleEdit = (id, data) => {
    setSelectedRow({ id, data });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow({ id: null, data: null });
  };

  return (
    <>
      <div>Home</div>

      <TableMake
        vehicleData={vehicleModelData}
        onEdit={handleEdit}
        onDelete={async (id) => {
          await vehicleModelFormStore.deleteData(id);
          await vehicleModelData.getData('fetchVehicleModels');
        }}
      />
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            {/* Replace the content of the modal with DynamicInputRenderer */}
            <UpdateForm
              data={selectedRow.data}
              formStore={vehicleModelFormStore}
            />
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
export default observer(Home);
