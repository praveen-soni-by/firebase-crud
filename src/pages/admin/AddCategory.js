import { useFormik } from "formik";
import { useState } from "react";
import { addCategory } from "../../services/CategoryService";
import FormBuilder from "../../utils/FormBuilder";
import { successMsg } from "../../utils/Message";
import { AddCategoryValidator } from "../../utils/Validators";

const formConfig = [
  {
    name: "name",
    label: "Name",
    isRequired: true,
  },
  {
    name: "code",
    label: "Code",
    isRequired: true,
  },
];

const initialState = {
  name: "",
  code: "",
  id: "",
  createAt: null,
};

export default function AddCategory(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: initialState,
    validate: (data) => AddCategoryValidator(data),
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
      addCategory(data)
        .then((doc) => {
          props.showSuccess(successMsg("Category"));
          props.updateCategory({
            ...data,
            id: doc.id,
          });
          formik.resetForm();
        })
        .catch((err) => {
          console.error(err);
          props.showError("Failed to add Category");
        });
    },
  });

  return (
    <>
      <div className="form flex justify-content-center">
        <div className="card">
          <h3 className="flex-container p-text-center">Add Category</h3>
          <div className="p-fluid grid">
            <FormBuilder formik={formik} config={formConfig} />
          </div>
        </div>
      </div>
    </>
  );
}
