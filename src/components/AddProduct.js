import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { fetchItem } from "../firebase/firebaseService";

const ProductInitialState = {
  name: "",
  price: null,
  sellPrice: null,
  category: null,
  isAvailable: true,
  discount: null,
  rating:0
};

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItem().then((data) => setCategories(data));
  }, []);

  const formik = useFormik({
    initialValues: ProductInitialState,
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <Card className="mx-auto w-50">
      <div className="form-demo">
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Product</h5>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              {TextField("Name", "name" ,true)}
              {TextField("Price", "price" ,true)}
              {TextField("Sell Price", "sellPrice" ,true)}
              {TextField("Discount (%)", "discount",false)}

              <div className="field">
                <span className="p-float-label">
                  <Dropdown
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    options={categories}
                    optionLabel="name"
                  />
                  <label htmlFor="category">category</label>
                </span>
              </div>

              <Button type="submit" label="Submit" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </Card>
  );

  function TextField(label, fieldName,isRequred) {
    return (
      <div className="field p-mt-4">
        <span className="p-float-label">
          <InputText
            id={fieldName}
            name={fieldName}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            autoFocus
            className={classNames({
              "p-invalid": isFormFieldValid({ fieldName }),
            })}
          />
          <label
            htmlFor={fieldName}
            className={classNames({
              "p-error": isFormFieldValid({ fieldName }),
            })}
          >
            {label} {isRequred && "*"}
          </label>
        </span>
        {getFormErrorMessage({ fieldName })}
      </div>
    );
  }
}
