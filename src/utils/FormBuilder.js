import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export default function FormBuilder({ config, formik }) {
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
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        {config.map((filedDetails, index) => {
          return (
            <div className="field col-12 md:col-4">
              <span className="p-float-label">
                <InputText
                  id={filedDetails.name}
                  name={filedDetails.name}
                  value={formik.values[filedDetails.name]}
                  onChange={formik.handleChange}
                  autoFocus={index === 0}
                  autoCapitalize="true"
                  className={classNames({
                    "p-invalid": isFormFieldValid(filedDetails.name),
                  })}
                />
                <label
                  htmlFor={filedDetails.name}
                  className={classNames({
                    "p-error": isFormFieldValid(filedDetails.name),
                  })}
                >
                  {filedDetails.label} {filedDetails.isRequired && "*"}
                </label>
              </span>
              {getFormErrorMessage(filedDetails.name)}
            </div>
          );
        })}

        <Button type="submit" label="Add" className="mt-2" />
      </form>
    </>
  );
}
