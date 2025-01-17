import CustomPaginationGrid from "@app/components/Table";
import api from "@app/utils/api";
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTableFilter } from "@app/components/Table/TableProvider";
import { getTodos } from "../action";

const columns: GridColDef[] = [
  { field: "userId", headerName: "Name", width: 400 },
  { field: "item", headerName: "Todo", width: 400 },
  {
    field: "id",
    headerName: "Status",
    width: 400,
    renderCell: ({ row }) => {
      if (row.isDone) {
        return <Chip color="success" label="Success" />;
      }
      return <Chip color="error" label="pending" />;
    },
  },
];

export default function TableTodo() {
  const [entries, setEntries] = useState<GridRowsProp>([]);

  const [rowsCount, setRowsCount] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true)

  const { page } = useTableFilter();

  useEffect(() => {
    getTodos({ page : page+1}).then((res) => {
      setEntries(res.data.content.entries);
      setRowsCount(res.data.content.totalData);
      setLoading(false)
    });
  }, [page, status]);

  const onSearch = () => {
    api
      .get(
        "/todos?page=" +
          page +
          "&rows=10" +
          `&searchFilters={"name":"${searchFilter}"}`
      )
      .then((res) => {
        setEntries(res.data.content.entries);
        setRowsCount(res.data.content.totalData);
      });
  };
  return (
    <Card sx={{ padding: "20px" }}>
      <Grid alignItems={"center"} spacing={4} container>
        <Grid item>
          <Input
            onChange={(e) => {
              setSearchFilter(e?.currentTarget.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search"
          />
          <Button
            onClick={onSearch}
            sx={{ ml: 1 }}
            variant="contained"
            size="small"
          >
            Search
          </Button>
        </Grid>

        <Grid item>
          <FormControl variant="standard" sx={{ minWidth: 200 }}>
            <Select defaultValue="none" size="small" fullWidth>
              <MenuItem disabled value="none">
                Filter By status
              </MenuItem>
              <MenuItem value="ALL">Semua</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="selesai">Selesai</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <CustomPaginationGrid
        rowCount={rowsCount}
        rows={entries}
        columns={columns}
        loading={loading}
      />
    </Card>
  );
}
