export const convertImageToBase64 = (fileInput, callback) => {
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result;
      callback(base64String);
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
};

export const handleSort = (header, dataStore) => {
  const newSortBy = header.toLowerCase();
  dataStore.setSortOrder((dataStore.sortBy = newSortBy));
  dataStore.dataParams.sort = `${newSortBy}|${dataStore.sortOrder}`;
  dataStore.getData();
};

export const handleImageClick = (item, setSelectedImage) => {
  if (item && item.image) {
    setSelectedImage(item.image);
  } else {
    setSelectedImage(null); // Clear selected image if no logo present
  }
};

export const resetForm = (inputs) => {
  inputs.forEach((item) => {
    document.getElementsByName(item)[0].value = ""; // Reset input value to empty string
  });
};

export const extractHeaders = (data, headers) => {
  if (!data || data.length === 0 || !headers) return [];
  const dataObject = data[0];
  return Object.keys(dataObject).filter((header) => headers.includes(header));
};
