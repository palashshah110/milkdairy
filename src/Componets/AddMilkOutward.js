import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMilkOutward = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    dates: null,
    morning: "",
    evening: "",
  });

  const [fullNameOptions, setFullNameOptions] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleDateChange(date) {
    setUser({
      ...user,
      dates: date,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      fullName: user.fullName,
      dates: user.dates,
      morning: user.morning,
      evening: user.evening,
    };
    await axios
      .post("https://mymilkapp.glitch.me/AddMilkOutward", data)
      .then("success")
      .catch((error) => console.log(error));

    navigate("/MilkOutward");
  }

  async function getUserData() {
    try {
      const response = await axios.get("https://mymilkapp.glitch.me/Users");
      const data = response.data.map((item, index) => ({
        id: index, 
        fullName: item.fullName,
        role:item.role
      }));
      const AllFilterUsers = data.filter((item) => {return item.role === "customer" || item.role === "shop"} );

      setFullNameOptions(AllFilterUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Header />
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
            <Grid item xs={12}>
              <Autocomplete
                style={{ width: "auto" }}
                disablePortal
                id="combo-box-demo"
                options={fullNameOptions}
                getOptionLabel={(option) => option.fullName}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.fullName}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" />
                )}
                onChange={(event, newValue) => {
                  setUser({
                    ...user,
                    fullName: newValue ? newValue.fullName : "",
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick a Date"
                  value={user.dates}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="morning"
                value={user.morning}
                onChange={handleChange}
                type="number"
                label="Morning"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="evening"
                value={user.evening}
                onChange={handleChange}
                type="number"
                label="Evening"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
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
