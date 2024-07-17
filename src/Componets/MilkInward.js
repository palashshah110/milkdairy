import React, { useState } from "react";
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
import Header from "./Header";

export default function MilkInward() {
  const initialData = [
    {
      id: 1,
      date: "2024-07-16",
      fullName: "Rajesh Kumar",
      fat: 3,
      litre: 10,
      fatLitre: 30,
      snf: 8.5,
      milk: "Cow Milk",
      morning: 10,
      evening: 8,
    },
    {
      id: 2,
      date: "2024-07-17",
      fullName: "Sunita Devi",
      fat: 4,
      litre: 10,
      fatLitre: 40,
      snf: 8.8,
      milk: "Buffalo Milk",
      morning: 12,
      evening: 9,
    },
    {
      id: 3,
      date: "2024-07-18",
      fullName: "Amit Sharma",
      fat: 3,
      litre: 10,
      fatLitre: 30,
      snf: 8.6,
      milk: "Cow Milk",
      morning: 9,
      evening: 7,
    },
    {
      id: 4,
      date: "2024-07-19",
      fullName: "Neha Gupta",
      fat: 5,
      litre: 10,
      fatLitre: 50,
      snf: 8.7,
      milk: "Buffalo Milk",
      morning: 11,
      evening: 10,
    },
    {
      id: 5,
      date: "2024-07-20",
      fullName: "Vikram Singh",
      fat: 3,
      litre: 10,
      fatLitre: 3.7,
      snf: 8.5,
      milk: "Cow Milk",
      morning: 8,
      evening: 6,
    },
  ];

  const [shift, setShift] = useState("morning");
  const [data, setData] = useState(initialData);

  const handleShiftChange = (event) => {
    const newShift = event.target.value;
    setShift(newShift);
    if (newShift === "evening") {
      setData([...data].reverse());
    } else {
      setData(initialData);
    }
  };

  const columns = [
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "fat", headerName: "Fat", flex: 1 },
    { field: "litre", headerName: "Litre", flex: 1 },
    { field: "fatLitre", headerName: "Fat Litre", flex: 1 },
    { field: "snf", headerName: "Amount", flex: 1 },
    { field: "milk", headerName: "Milk", flex: 1 },
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
          <Button variant="outlined">Add</Button>
        </Box>
        <Box mb={2}>
          <Typography>Date: 18/07/2024</Typography>
            </Box>
            <Box mb={2}>

          <FormControl>
            <Typography>Shift</Typography>
            <Select
              value={shift}
              onChange={handleShiftChange}
            >
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
