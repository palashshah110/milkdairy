import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Paper,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";

export default function MilkInward() {
  const navigate = useNavigate();

  const cowRate = 60;
  const buffaloRate = 70;

  const [initialData, setInitialData] = useState([]);
  // const [data, setData] = useState([]);
  const [shift, setShift] = useState("morning");
  const [currentDate, setCurrentDate] = useState("");
  const [milkType, setMilkType] = useState("All");
  async function getData() {
    try {
      const response = await axios.get("http://mymilkapp.glitch.me/milkInward");
      const milkInwardData = response.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setInitialData(milkInwardData);
      // setData(milkInwardData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
    getData();
  }, []);


  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleMilkTypeChange = (event) => {
    setMilkType(event.target.value);
  };

  function handleAddInward() {
    navigate("/AddMilkInward");
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://mymilkapp.glitch.me/milkInward/${id}`);
      getData();
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return new Date(row.date).toLocaleDateString() } },
    { field: 'shift', headerName: 'Shift', flex: 1 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },

    // Buffalo Milk Fields
    { field: 'buffalo.rate', headerName: 'Buffalo Rate', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.rate } },
    { field: 'buffalo.fat', headerName: 'Buffalo Fat', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.fat } },
    { field: 'buffalo.litre', headerName: 'Buffalo Litres', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.litre } },
    { field: 'buffalo.amount', headerName: 'Buffalo Amount', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.amount } },

    // Cow Milk Fields
    { field: 'cow.rate', headerName: 'Cow Rate', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.cow.rate } },
    { field: 'cow.fat', headerName: 'Cow Fat', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.fat } },
    { field: 'cow.litre', headerName: 'Cow Litres', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.litre } },
    { field: 'cow.amount', headerName: 'Cow Amount', flex: 1, headerAlign: 'center', align: 'center', valueGetter: (value, row) => { return row.buffalo.amount } },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];


  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
      >
        <Toolbar />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Milk Inward</Typography>
          <Button onClick={handleAddInward} variant="outlined">
            Add
          </Button>
        </Box>
        <Box mb={2} display="flex" gap={3} alignItems="center">
          <Typography>Date: {currentDate}</Typography>
          <Typography>Rate</Typography>
          <Typography>Cow: {cowRate} / liter</Typography>
          <Typography>Buffalo: {buffaloRate} / liter</Typography>
        </Box>
        <Box mb={2} display="flex" flexDirection="row">
          <FormControl style={{ marginRight: "1rem" }}>
            <Typography>Shift</Typography>
            <Select value={shift} onChange={handleShiftChange}>
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Milk Type</Typography>
            <Select
              value={milkType}
              onChange={handleMilkTypeChange}
              style={{ flex: 1 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="cow">Cow</MenuItem>
              <MenuItem value="buffalo">Buffalo</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Paper sx={{ height: 400, flex: "0%" }}>
          <DataGrid
            rows={initialData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
            }}
          />
        </Paper>
      </Box>
      <ToastContainer/>
    </>
  );
}
