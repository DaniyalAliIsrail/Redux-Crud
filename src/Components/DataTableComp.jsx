import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";

import { useSelector } from "react-redux";
import { Button } from "primereact/button";

const DataTableComp = ({delIdFun,updateFun,filters}) => {
  const todos = useSelector((state) => state.todos);
  console.log("table", todos);

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

  const columns = [
    { field: "name", header: "Name" },
    { field: "jobRoll", header: "Job Roll" },
  ];

  return (
    <div>
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
            style={{ width: "34%" }}
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
                // label="Edit"
                icon="pi pi-pencil"
                className="p-button-text p-button-warning"
                onClick={() => updateFun(rowData)}
              />

              <Button
                // label="Delete"
                icon="pi pi-trash"
                className="p-button-text p-button-danger"
                onClick={() => delIdFun(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>

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
  );
};

export default DataTableComp;
