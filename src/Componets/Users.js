import React from "react";
import { Box, Toolbar, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";

export default function Users() {
  const rows = [
    {
      id: 1,
      username: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      password: "******",
    },
    {
      id: 2,
      username: "Priya Sharma",
      email: "priya.sharma@example.com",
      password: "******",
    },
    {
      id: 3,
      username: "Amit Verma",
      email: "amit.verma@example.com",
      password: "******",
    },
    {
      id: 4,
      username: "Sonal Patel",
      email: "sonal.patel@example.com",
      password: "******",
    },
    {
      id: 5,
      username: "Vikram Singh",
      email: "vikram.singh@example.com",
      password: "******",
    },
    {
      id: 6,
      username: "Neha Gupta",
      email: "neha.gupta@example.com",
      password: "******",
    },
    {
      id: 7,
      username: "Anil Joshi",
      email: "anil.joshi@example.com",
      password: "******",
    },
    {
      id: 8,
      username: "Pooja Mehta",
      email: "pooja.mehta@example.com",
      password: "******",
    },
    {
      id: 9,
      username: "Suresh Rao",
      email: "suresh.rao@example.com",
      password: "******",
    },
    {
      id: 10,
      username: "Kavita Nair",
      email: "kavita.nair@example.com",
      password: "******",
    },
    {
      id: 11,
      username: "Rohan Desai",
      email: "rohan.desai@example.com",
      password: "******",
    },
    {
      id: 12,
      username: "Anjali Iyer",
      email: "anjali.iyer@example.com",
      password: "******",
    },
    {
      id: 13,
      username: "Mukesh Yadav",
      email: "mukesh.yadav@example.com",
      password: "******",
    },
    {
      id: 14,
      username: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      password: "******",
    },
    {
      id: 15,
      username: "Arjun Choudhary",
      email: "arjun.choudhary@example.com",
      password: "******",
    },
  ];
  

  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
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
            rows={rows || []}
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
