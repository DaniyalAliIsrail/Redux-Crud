import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React from "react";

const AddTodoComp = ({ addTodoFun, setVisible, visible }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      jobRoll: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name field is required";
      } else if (values.name.length < 4) {
        errors.name = "Length must be at least 3 characters";
      }

      if (!values.jobRoll) {
        errors.jobRoll = "Job Roll field is required";
      } else if (values.jobRoll.length < 4) {
        errors.jobRoll = "Length must be at least 3 characters";
      }

      return errors;
    },

    onSubmit: (values) => {
      addTodoFun(values.name, values.jobRoll);
      formik.resetForm();
    },
  });
  return (
    <div>
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        style={{ border: "1px solid blue", width: "26vw" }}
      >
        <h2>Todo App</h2>
        <div className="form-design-handle">
          <div>
            <form onSubmit={formik.handleSubmit}>
              <InputText
                placeholder="Name"
                className="margin-top input-todo-button"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}

              <InputText
                placeholder="Job Roll"
                className="margin-top input-todo-button"
                name="jobRoll"
                value={formik.values.jobRoll}
                onChange={formik.handleChange}
              />
              {formik.errors.jobRoll && (
                <div style={{ color: "red" }}>{formik.errors.jobRoll}</div>
              )}
              <Button
                className="add-todo-button"
                type="submit"
                label="Add Todo"
              />
            </form>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                visible={visible}
                onClick={() => setVisible(false)}
                className="cancel-btn"
                icon="pi pi-times"
                label="Cancel"
                severity="danger"
                text
              />
              <Button
              onClick={() => {
                // Errors ko check karo
                if (!formik.errors.name && !formik.errors.jobRoll) {
                  addTodoFun(formik.values.name, formik.values.jobRoll); // Add karte hain name aur jobRoll
                  formik.resetForm(); // Form reset karte hain taa ke fields khali ho jaayein
                }
              }}
              className="saveNext"
              label="Save & Next"
              severity="help"
              outlined
            />
              <Button
                onClick={() => {
                  if (!formik.errors.name && !formik.errors.jobRoll) {
                    formik.handleSubmit();
                    setVisible(false); // Save aur exit par sidebar close ho jaye
                  }
                }}
                className="saveNext"
                label="Save & Exit"
                severity="help"
              />
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default AddTodoComp;
