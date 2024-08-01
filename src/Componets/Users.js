import React, { useEffect, useState } from "react";
import { Box, Toolbar, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Users() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://mymilkapp.glitch.me/Users");
        const data = response.data.map((item, index) => ({
          id: index + 1,
          ...item
        }));
        setRow(data);
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    }
    getData()
  }, []);

  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
    axios.delete(`https://mymilkapp.glitch.me/Users/${row.id}`)
      .then(response => {
        setRow((prevRows) => prevRows.filter((item) => item.id !== row.id));
      })
      .catch(error => {
        console.error("Error while deleting:", error);
      });
  };

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
      field: "mobileNumber",
      headerName: "Mobile Number",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <EditIcon
            style={{ cursor: "pointer", marginRight: 16 }}
            // onClick={() => handleEdit(params.row)}
          />
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row)}
          />
        </>
      ),
    }

  ];
  const navigate = useNavigate();
  function handleAddInward() {
    navigate("/AddUsers");
  }
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
            Users
          </Box>
          <Button onClick={handleAddInward} variant="outlined">
            Add
          </Button>
        </Box>

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
