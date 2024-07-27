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

export default function MilkInward() {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [shift, setShift] = useState("morning");

  async function getData() {
    try {
      const response = await axios.get("https://mymilkapp.glitch.me/milkInward");
      const milkInwardData = response.data.map((item, index) => ({
        id: index + 1,
        ...item
      }));

      setInitialData(milkInwardData);
      setData(milkInwardData.filter((item) => item.morning || item.evening));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (shift === "morning") {
      setData(initialData.filter((item) => item.morning));
    } else {
      setData(initialData.reverse());
    }
  }, [shift, initialData]);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  function handleAddInward() {
    navigate("/AddMilkInward");
  }

  const columns = [
    { field: "fullName", headerName: "Full Name", flex: 1,headerAlign:'center',align:'center' },
    { field: "fat", headerName: "Fat", flex: 1,headerAlign:'center',align:'center' },
    { field: "litre", headerName: "Litre", flex: 1,headerAlign:'center',align:'center' },
    { field: "fat", headerName: "Fat Litre", flex: 1,headerAlign:'center',align:'center' },
    { field: "amount", headerName: "Amount", flex: 1,headerAlign:'center',align:'center' },
    { field: "milk", headerName: "Milk", flex: 1,headerAlign:'center',align:'center' },
  ];

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
      >
        <Toolbar />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box></Box>
          <Box
            sx={{
              fontFamily: "Roboto",
              fontSize: "24px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Milk Inward
          </Box>
          <Button onClick={handleAddInward} variant="outlined">
            Add
          </Button>
        </Box>
        <Box mb={2}>
          <Typography>Date: 18/07/2024</Typography>
        </Box>
        <Box mb={2}>
          <FormControl>
            <Typography>Shift</Typography>
            <Select value={shift} onChange={handleShiftChange}>
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
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
    </>
  );
}
