import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import { useTableFilter } from "./TableProvider";
import { Backdrop, CircularProgress } from "@mui/material";

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <MuiPagination
      color="primary"
      className={className}
      shape="rounded"
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

interface CustomPaginationGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
  rowCount?: number;
  loading?: boolean;
}

const CustomPaginationGrid: React.FC<CustomPaginationGridProps> = ({
  rows,
  columns,
  rowCount,
  loading,
}) => {
  const { setPage, page } = useTableFilter();
  if (loading) {
    return (
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          border: 0,
        }}
        pageSizeOptions={[]}
        rowCount={rowCount}
        paginationModel={{ page, pageSize: 10 }}
        onPaginationModelChange={({ page: pageState }) => {
          setPage(pageState);
        }}
        loading={loading}
      />
    </Box>
  );
};

export default CustomPaginationGrid;
