import React from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from '@mui/material/Autocomplete';
import Header from "./Header";

const AddMilkOutward = () => {

  const Users = [
    { label: "Rohan Das" },
    { label: "Sahil Dhoke"},
    { label: "Adarsh Jat" },
    { label: "Rajesh Patidar"},
    { label: "Priyanshu Jain" },
    { label: "Mithilesh Rajput" },
    { label: "Pritesh Mishra" },
  ];


  return (
    <>
    <Header/>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          width: "700px",
          maxWidth: "700px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Outward Milk
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2} direction="row">
          <Grid  item xs={12}>
              <Autocomplete
              style={{width:"auto"}}
                disablePortal
                id="combo-box-demo"
                options={Users}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Pick a Date" />                
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField type="number" label="Morning" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField type="number" label="Evening" variant="outlined" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default AddMilkOutward;
