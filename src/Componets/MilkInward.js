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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MilkInward() {
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [shift, setShift] = useState("morning");
  const [currentDate, setCurrentDate] = useState("");
  const [milkType, setMilkType] = useState("");

  async function getData() {
    try {
      const response = await axios.get(
        "https://mymilkapp.glitch.me/milkInward"
      );
      const milkInwardData = response.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setInitialData(milkInwardData);
      setData(
        milkInwardData.filter((item) =>
          shift === "morning" ? item.morning : item.evening
        )
      );
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

  useEffect(() => {
    setData(
      initialData.filter(
        (item) =>
          (shift === "morning" ? item.morning : item.evening) &&
          (milkType ? item.milk.toLowerCase() === milkType.toLowerCase() : true)
      )
    );
  }, [shift, milkType, initialData]);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleMilkTypeChange = (event) => {
    setMilkType(event.target.value);
  };

  function handleAddInward() {
    navigate("/AddMilkInward");
  }

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fat",
      headerName: "Fat",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "litre",
      headerName: "Litre",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fatLitre",
      headerName: "Fat Litre",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rate",
      headerName: "Rate",
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
      field: "milk",
      headerName: "Milk",
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
            // onClick={() => handleDelete(params.row)}
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
        <Box mb={2} display="flex" gap={3} alignItems="center">
          <Typography>Date: {currentDate}</Typography>
          <Typography>Rate: </Typography>
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
            <Typography>Milk</Typography>
            <Select
              value={milkType}
              onChange={handleMilkTypeChange}
              style={{ width: 100 }}
            >
              <MenuItem value="cow">Cow</MenuItem>
              <MenuItem value="buffalo">Buffalo</MenuItem>
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
