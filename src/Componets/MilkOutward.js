import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MilkOutward() {

  const navigate = useNavigate()

  const [row, setRow] = useState([])

  const columns = [
    { field: 'dates', headerName: 'Dates', flex: 1 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'morning', headerName: 'Morning (in Litre)', flex: 1 },
    { field: 'evening', headerName: 'Evening (in Litre)', flex: 1 },
  ];

  async function getData() {
    try {
      const response = await axios.get('http://localhost:4000/milkOutward')
      const data = response.data.map( (item,index) => ({
        id: index + 1,
        dates:item.dates,
        fullName:item.fullName,
        morning:item.morning,
        evening:item.evening
      }))
      setRow(data)
    } catch (error) {
      console.error(error)
    }
    
  }

  useEffect( () => {
    getData()
  })

  function handleAddButton() {
    navigate('/AddMilkOutward')
  }

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
          <Button onClick={handleAddButton} variant="outlined">
            Add
          </Button>
        </Box>
        
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={row}
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
