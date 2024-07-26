import React, { useEffect, useState } from "react";
import { Box, Toolbar, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import axios from "axios";

export default function Users() {
  const [row, setRow] = useState([]);

  async function getData() {
    try {
      const response = await axios.get("https://mymilkapp.glitch.me/Users");
      const data = response.data.map((item, index) => ({
        id: index + 1,
        fullName: item.fullName,
        email: item.email,
        password: item.password,
      }));
      setRow(data);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "password",
      headerName: "Password",
      flex: 2,
      headerAlign: "center",
      align: "center",
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
        <Typography
          variant="h4"
          sx={{ fontSize: "20px", color: "#6945FF", textAlign: "center" }}
        >
          User Program
        </Typography>
        <Paper sx={{ marginTop: "20px", height: "75vh", width: "100%" }}>
          <DataGrid
            rows={row || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
          />
        </Paper>
      </Box>
    </>
  );
}
