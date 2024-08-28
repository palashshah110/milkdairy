import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Paper,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MilkOutward() {
  const navigate = useNavigate();

  const [row, setRow] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [milkType, setMilkType] = useState('All');

  const cowRate = 70;
  const buffaloRate = 60;

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "milk",
      headerName: "Milk Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "morning",
      headerName: "Morning (in Litre)",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "evening",
      headerName: "Evening (in Litre)",
      flex: 1,
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
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  async function getData() {
    try {
      const outwardResponse = await axios.get(
        "https://mymilkapp.glitch.me/milkOutward"
      );
      const outwardData = outwardResponse.data.map((item, index) => ({
        id: index + 1,
        date: item.dates ? new Date(item.dates).toLocaleDateString() : "N/A",
        ...item,
      }));

      setRow(outwardData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Set current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);

    // Fetch data
    getData();
  }, []);

  function handleAddButton() {
    navigate("/AddMilkOutward");
  }

  function handleMilkTypeChange(event) {
    setMilkType(event.target.value);
  }

  const filteredRows = row.filter(
    (item) => milkType === "All" || item.milk === milkType
  );

  const handleDelete = async(id)=>{
    try{
      const response = await axios.delete(`https://mymilkapp.glitch.me/milkOutward/${id}`);
      alert(response.data.message)
      getData()
    }catch(err){
      console.log(err)
    }
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
            Milk Outward
          </Box>
          <Button onClick={handleAddButton} variant="outlined">
            Add
          </Button>
        </Box>
        <Box mb={2} display="flex" flexDirection="row">
      <FormControl>
        <Typography>Milk Type</Typography>
        <Select
          value={milkType}
          onChange={handleMilkTypeChange}
          style={{ width: 100 }}
          defaultValue={milkType}
        >
          <MenuItem value="All" selected>All</MenuItem>
          <MenuItem value="cow">Cow</MenuItem>
          <MenuItem value="buffalo">Buffalo</MenuItem>
        </Select>
      </FormControl>
    </Box>
          <Box mb={2} display="flex" gap={3} alignItems="center">
          <Typography>Date: {currentDate}</Typography>
          <Typography>Rate: </Typography>
          <Typography>Cow: {cowRate} / liter </Typography>
          <Typography>Buffalo: {buffaloRate} / liter </Typography>
        </Box>

        <Box mb={2}></Box>

        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
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
