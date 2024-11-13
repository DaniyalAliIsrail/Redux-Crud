import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useFormik } from "formik";
import Banner from "./Components/Banner";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import LoadingComp from "./Components/LoadingComp";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo,updateTodo } from "./redux/actions";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [visible, setVisible] = useState(false);

  // ADD TODO
  const handleAddTodo = (name, jobRoll) => {
    const newTodo = {
      id: Math.random(),
      name,
      jobRoll,
    };
    dispatch(addTodo(newTodo)); 
    setVisible(false);
  };

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
      handleAddTodo(values.name, values.jobRoll); 
      formik.resetForm();
    },
  });


  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const [editVisible, setEditVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const openEditModal = (todo) => {
    console.log(todo)
    setCurrentTodo(todo);
    setEditVisible(true);
  };

  const handleEditChange = (e, field) => {
    setCurrentTodo({ ...currentTodo, [field]: e.target.value });
  };


  const handleUpdate = () => {
    dispatch(updateTodo(currentTodo));
    setEditVisible(false); 
  };



  // Pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
    const endIndex = e.first + e.rows;
    setCurrentPageData(todos.slice(e.first, endIndex));
  };

  // Ye effect pagination ke update ke sath todos ko sync karne ke liye hai
  useEffect(() => {
    const endIndex = first + rows;
    setCurrentPageData(todos.slice(first, endIndex));
  }, [todos, first, rows]);

  const template3 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",

    CurrentPageReport: (options) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  //serach filter

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const columns = [
    { field: "name", header: "Name" }, // Use 'name' field
    { field: "jobRoll", header: "Job Roll" }, // Use 'jobRoll' field
  ];

  return (
    <>
      <Banner />
      <div className="container">
        <div className="sidebar">
          <h2>Sidebar</h2>
          <p>This sidebar will stay sticky.</p>
          <p>This sidebar will stay sticky.</p>
        </div>
        <div className="main-content">
          {/* nav-banner-style-type */}

          <div>
            <div className="nav-banner-TypeStyle">
              <div className="nav-banner1">
                <div>
                  <i
                    className="pi pi-user"
                    style={{ fontSize: "1rem", padding: "5px" }}
                  ></i>
                  <span>People</span>
                </div>

                <div className="nav-banner2">
                  <div className="flex justify-content-end">
                    <div className="flex justify-content-end">
                      <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                          value={globalFilterValue}
                          onChange={onGlobalFilterChange}
                          className="p-inputtext-sm"
                          placeholder="Search Anything"
                        />
                      </IconField>
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={() => setVisible(true)}
                      icon="pi pi-plus"
                      size="small"
                      label="People"
                    />
                  </div>
                  <div
                    className="pi pi-refresh"
                    style={{ fontSize: "1.5rem", color: "blue" }}
                    onClick={() => window.location.reload()}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar for adding new todos */}
          <div className="card flex justify-content-center">
            <Sidebar
              visible={visible}
              position="right"
              onHide={() => setVisible(false)}
            >
              <h2>Todo App</h2>
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
            </Sidebar>
          </div>

          {/* Edit modal */}

          <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)}>
            <h2>Edit Todo</h2>
            <InputText
              placeholder="Update Name"
              className="margin-top input-todo-button"
              value={currentTodo?.name || ""}
              onChange={(e) => handleEditChange(e, "name")}
            />
            <InputText
              placeholder="Update Job Roll"
              className="margin-top input-todo-button"
              value={currentTodo?.jobRoll || ""}
              onChange={(e) => handleEditChange(e, "jobRoll")}
            />
            {/* <Button className="add-update-button" label="Update Todo" /> */}

            <Button className="add-update-button" onClick={handleUpdate} label="Update Todo" />
            </Sidebar> 

          

          {/* Table with Pagination */}

          <div className=" table">
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <DataTable
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "6px",
                  }}
                  removableSort
                  scrollHeight="400px"
                  value={currentPageData}
                  globalFilterFields={["name", "jobRoll"]}
                  filters={filters}
                >
                  {columns.map((col) => (
                    <Column
                      style={{ width: "33%" }}
                      key={col.field}
                      field={col.field}
                      header={col.header}
                     sortable
                    />
                  ))}
                  <Column
                    header="Actions"
                    body={(rowData) => (
                      <div>
                        <Button
                          label="Edit"
                          icon="pi pi-pencil"
                          className="p-button-text p-button-warning"
                          onClick={() => openEditModal(rowData)}
                        />

                        <Button
                          label="Delete"
                          icon="pi pi-trash"
                          className="p-button-text p-button-danger"
                          onClick={() => handleDeleteTodo(rowData.id)}
                        />
                      </div>
                    )}
                  />
                </DataTable>
              </>
            )}

            <div className="pagination">
              <Paginator
                // style={{ width: "80%", maxWidth: "1200px" }}
                first={first}
                rows={rows}
                totalRecords={todos.length}
                rowsPerPageOptions={[5, 10]}
                onPageChange={onPageChange}
                template={template3}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
