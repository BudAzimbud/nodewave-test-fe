import { Chip } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Name", width: 400 },
  { field: "col2", headerName: "Todo", width: 200 },
  {
    field: "id",
    headerName: "Status",
    maxWidth:400,
    renderCell: ({ row }) => {
      console.log()
      if(row.status == 'Success'){
        return <Chip />
      }
      return <Chip />;
    },
  },
];

export default function TableTodo() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
