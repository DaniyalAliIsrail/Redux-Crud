import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import React from "react";


const UpdateTodoComp = ({setEditVisible,editVisible ,currentTodo,UpdateTodo,onEditChange}) => {
  return (
    <div>
      <Sidebar
        visible={editVisible}
        position="right"
        onHide={() => setEditVisible(false)}
      >
        <h2>Edit Todo</h2>
        <InputText
          placeholder="Update Name"
          className="margin-top input-todo-button"
          value={currentTodo?.name || ""}
          onChange={(e) => onEditChange(e, "name")}
        />
        <InputText
          placeholder="Update Job Roll"
          className="margin-top input-todo-button"
          value={currentTodo?.jobRoll || ""}
          onChange={(e) => onEditChange(e, "jobRoll")}
        />

        <Button
          className="add-update-button"
          onClick={UpdateTodo}
          label="Update Todo"
        />
      </Sidebar>
    </div>
  );
};

export default UpdateTodoComp;
