import { useFormik } from "formik";
import { useState } from "react";
import { addProduct } from "../../services/ProductService";
import FormBuilder from "../../utils/FormBuilder";
import { successMsg } from "../../utils/Message";
import { AddProductValidator } from "../../utils/Validators";

//isAvailable: true,
//rating:0

const formConfig = [
  {
    name: "name",
    label: "Name",
    isRequired: true,
  },
  {
    name: "price",
    label: "Price",
    isRequired: true,
  },
  {
    name: "sellPrice",
    label: "Sell Price",
    isRequired: true,
  },
  {
    name: "category",
    label: "Category",
    isRequired: true,
  },
  {
    name: "discount",
    label: "Discount",
    isRequired: false,
  },
];

const initialState = {
  name: "",
  price: "",
  sellPrice: "",
  category: "",
  isAvailable: true,
  id: "",
  createAt: null,
};

export default function AddCategory(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: initialState,
    validate: (data) => AddProductValidator(data),
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
      addProduct(data)
        .then((doc) => {
          props.showSuccess(successMsg("Product"));
          props.updateCategory({
            ...data,
            id: doc.id,
          });
          formik.resetForm();
        })
        .catch((err) => {
          console.error(err);
          props.showError("Failed to add Product");
        });
    },
  });

  return (
    <>
      <div className="form flex justify-content-center">
        <div className="card">
          <h3 className="flex-container p-text-center">Add ssssssProduct</h3>
          <div className="p-fluid grid">
            <FormBuilder formik={formik} config={formConfig} />
          </div>
        </div>
      </div>
    </>
  );
}
