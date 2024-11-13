import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const LoadingComp = () => {
    const items = Array.from({ length: 5 }, (v, i) => i);
  return (
    <div>
    <div className="card">
      <DataTable value={items} className="p-datatable-striped">
        <Column
          field="name"
          header="Name"
          style={{ width: "25%" }}
          body={<Skeleton />}
        ></Column>
        <Column
          field="JobRoll"
          header="JobRoll"
          style={{ width: "25%" }}
          body={<Skeleton />}
        ></Column>
        <Column
          field="quantity"
          header="Action"
          style={{ width: "25%" }}
          body={<Skeleton />}
        ></Column>
      </DataTable>
    </div>
  </div>
  )
}

export default LoadingComp