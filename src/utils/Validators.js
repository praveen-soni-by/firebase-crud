export const AddCategoryValidator = (data) => {
  let errors = {};
  if (!data.name) {
    errors.name = "Name is required.";
  }
  if (!data.code) {
    errors.code = "Code is required.";
  }
  return errors;
};

export const AddProductValidator = (data) => {
  let errors = {};
  if (!data.name) {
    errors.name = "Name is required.";
  }
  if (!data.price) {
    errors.code = "Price is required.";
  }
  if (!data.sellPrice) {
    errors.code = "Sell Price is required.";
  }
  if (!data.category) {
    errors.code = "Category is required.";
  }

  return errors;
};
