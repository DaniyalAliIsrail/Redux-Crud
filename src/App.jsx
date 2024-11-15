import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import Banner from "./Components/Banner";
import { FilterMatchMode } from "primereact/api";
import LoadingComp from "./Components/LoadingComp";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./redux/actions";
import AddTodoComp from "./Components/AddTodoComp";
import UpdateTodoComp from "./Components/UpdateTodoComp";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import NavbarType from "./Components/NavbarType";
import DataTableComp from "./Components/DataTableComp";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [delVisible, setDelVisible] = useState(false);
  const [delId, setDelId] = useState(null);

  const [editVisible, setEditVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  console.log(todos);

  const toast = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // ADD TODO
  const handleAddTodo = (name, jobRoll) => {
    const newTodo = {
      id: Math.random(),
      name,
      jobRoll,
    };
    dispatch(addTodo(newTodo));
  };

  // DEL FUN
  const handleDeleteId = (id) => {
    setDelId(id);
    setDelVisible(true);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(delId));
    setDelVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: "Record deleted successfully",
      life: 3000,
    });
  };

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setDelVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        severity="danger"
        icon="pi pi-check"
        onClick={handleDeleteTodo}
        autoFocus
      />
    </div>
  );

  //EDIT FUN

  const openEditModal = (todo) => {
    console.log(todo);
    setCurrentTodo(todo);
    setEditVisible(true);
  };

  const handleEditChange = (e, field) => {
    setCurrentTodo({ ...currentTodo, [field]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateTodo(currentTodo));
    setEditVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Update",
      detail: "Record update successfully",
      life: 3000,
    });
  };

  //search filter
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
          <Toast ref={toast} />

          <div>
            <NavbarType
              setVisible={setVisible}
              globalFilterValue1={globalFilterValue}
              onGlobalFilterChangeFun={onGlobalFilterChange}
            />
          </div>

          <AddTodoComp
            addTodoFun={handleAddTodo}
            setVisible={setVisible}
            visible={visible}
          />

          <UpdateTodoComp
            currentTodo={currentTodo}
            setEditVisible={setEditVisible}
            editVisible={editVisible}
            onEditChange={handleEditChange}
            UpdateTodo={handleUpdate}
          />

          <Dialog
            header="Delete Confirmation"
            visible={delVisible}
            style={{ width: "25vw" }}
            onHide={() => {
              if (!delVisible) return;
              setDelVisible(false);
            }}
            footer={footerContent}
          >
            <p className="m-0">Do You want to delete this record ?</p>
          </Dialog>

          {/* Table with Pagination */}
          <div className=" table">
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <DataTableComp
                  filters={filters}
                  updateFun={openEditModal}
                  delIdFun={handleDeleteId}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
