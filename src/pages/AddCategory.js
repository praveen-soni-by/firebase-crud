import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { addItem } from "../firebase/firebaseService";

const CategorySchema = {
  name: "",
  code: "",
  id: "",
};
const SUCCESS= "Category Added Successfully";

export default function AddCategory(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const formik = useFormik({
    initialValues: CategorySchema,
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.name) {
        errors.code = "Code is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
      addItem(data)
        .then((doc) => {
          props.showSuccess(SUCCESS);
          props.updateCategory({
            ...data,
            id: doc.id,
          });
          formik.resetForm();
        })
        .catch((err) => props.showError(err));
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

  return (
    <>
      <div className="form flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Category</h5>
          <div className="p-fluid grid">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values["name"]}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name"),
                    })}
                  >
                    NAME *
                  </label>
                </span>
                {getFormErrorMessage("name")}
              </div>

              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <InputText
                    id="code"
                    name="code"
                    value={formik.values["code"]}
                    onChange={formik.handleChange}
                    autoFocus
                    className={classNames({
                      "p-invalid": isFormFieldValid("code"),
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("code"),
                    })}
                  >
                    Code *
                  </label>
                </span>
                {getFormErrorMessage("code")}
              </div>

              <Button type="submit" label="Add" className="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
