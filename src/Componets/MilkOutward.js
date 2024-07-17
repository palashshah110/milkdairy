import React from "react";
import {
  Box,
  Toolbar,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";

export default function MilkOutward() {

  const Data = [
    { id: 1, dates: "16-07-2024", fullName: "Rajesh", morning: "2", evening: "3" },
    { id: 2, dates: "14-07-2024", fullName: "Pratesh", morning: "1", evening: "2" },
    { id: 3, dates: "11-07-2024", fullName: "Ram", morning: "2", evening: "4" },
    { id: 4, dates: "10-07-2024", fullName: "Shubh", morning: "3", evening: "1" }
  ];

  const columns = [
    { field: 'dates', headerName: 'Dates', flex: 1 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'morning', headerName: 'Morning (in Litre)', flex: 1 },
    { field: 'evening', headerName: 'Evening (in Litre)', flex: 1 },
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
          <Box></Box>
          <Box
            sx={{
              fontFamily: "Roboto",
              fontSize: "24px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Milk Outward
          </Box>
          <Button variant="outlined">
            Add
          </Button>
        </Box>
        
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={Data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
            }}
          />
        </Paper>

      </Box>
    </>
  );
}
