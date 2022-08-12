import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getListOfCompanies } from "../Service/getListOfCompaines";
import { useState, useEffect } from "react";
const columns = [

  // {
  //   field: "uniqueId",
  //   headerName: "uniqueId",
  //   description: "Combination of Company Name and Company Id ➕",
  //   sortable: false,
  //   width: 430,
  //   valueGetter: (params) =>
  //     `${params.row.company_name || ""} ${params.row.company_id || ""}`,
  // },
  { field: "company_id", headerName: "ID", width: 430 },
  { field: "company_name", headerName: "Company name", width: 430 },
  { field: "on_record", headerName: "On Record 🧾", width: 130 },
  { field: "updatedAt", headerName: "Last Updated At", width: 220 },

];
let errorMsg = "";
let rows = [];

export default function DataTable() {
  const [rowsData,setRowsData]=useState([])
  useEffect(()=>{
    getListOfCompanies().then(function (response) {
      console.log(JSON.stringify(response.data));
      rows = response.data;
      setRowsData( rows);
      errorMsg=""
    })
    .catch(function (error) {
      console.log(error);
      errorMsg= "Some Error Occured " + error;
    });

  },[])

  getListOfCompanies()
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId ={(row) => row.company_id}
      />
      <span>{errorMsg}</span>
    </div>
  );
}
