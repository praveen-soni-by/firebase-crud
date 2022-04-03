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
