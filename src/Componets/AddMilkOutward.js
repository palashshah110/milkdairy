import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMilkOutward = () => {
  const navigate = useNavigate();

  const [isMorningDisabled, setIsMorningDisabled] = useState(false);
  const [isEveningDisabled, setIsEveningDisabled] = useState(false);

  const [user, setUser] = useState({
    milk: "",
    fullName: "",
    dates: null,
    morning: "",
    quantity: "",
    amount: "",
    evening: "",
  });

  const cowMilkRate = 60;
  const buffaloMilkRate = 70;

  const [fullNameOptions, setFullNameOptions] = useState([]);

  // Handle change in input fields
  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prevState) => {
      // Update user state with new value
      const updatedUser = { ...prevState, [name]: value };

      // Calculate the quantity and amount based on updated values
      const morningQuantity = parseFloat(updatedUser.morning) || 0;
      const eveningQuantity = parseFloat(updatedUser.evening) || 0;
      const totalQuantity = morningQuantity + eveningQuantity;

      // Determine rate based on milk type
      const rate =
        updatedUser.milk === "cow"
          ? cowMilkRate
          : updatedUser.milk === "buffalo"
          ? buffaloMilkRate
          : 0;

      // Calculate amount
      const amount = rate * totalQuantity;

      return {
        ...updatedUser,
        quantity: totalQuantity,
        amount: amount.toFixed(2), // Ensure amount is formatted to 2 decimal places
      };
    });
  }

  // Handle date change
  function handleDateChange(date) {
    setUser((prevState) => ({
      ...prevState,
      dates: date,
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      milk: user.milk,
      fullName: user.fullName,
      dates: user.dates,
      quantity: user.quantity,
      amount: user.amount,
      morning: user.morning,
      evening: user.evening,
    };
    await axios
      .post("https://mymilkapp.glitch.me/milkOutward", data)
      .then(() => {
        navigate("/MilkOutward");
      })
      .catch((error) => console.log(error));
    console.log(data);
  }

  // Disable morning and evening fields based on the current time
  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsEveningDisabled(currentHour >= 6 && currentHour < 16);
    setIsMorningDisabled(currentHour >= 16 || currentHour < 6);
  }, []);

  // Fetch user data for the autocomplete
  async function getUserData() {
    try {
      const response = await axios.get("https://mymilkapp.glitch.me/Users");
      const data = response.data.map((item, index) => ({
        id: index,
        fullName: item.fullName,
        role: item.role,
      }));
      const AllFilterUsers = data.filter((item) => item.role === "customer" || item.role === "shop");
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
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="milk-label">Milk</InputLabel>
                <Select
                  labelId="milk-label"
                  value={user.milk}
                  onChange={handleChange}
                  name="milk"
                  label="Milk"
                >
                  <MenuItem value="cow">Cow</MenuItem>
                  <MenuItem value="buffalo">Buffalo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                  setUser((prevState) => ({
                    ...prevState,
                    fullName: newValue ? newValue.fullName : "",
                  }));
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={user.morning}
                onChange={handleChange}
                name="morning"
                type="number"
                label="Morning"
                variant="outlined"
                fullWidth
                disabled={isMorningDisabled}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={user.evening}
                onChange={handleChange}
                name="evening"
                type="number"
                label="Evening"
                variant="outlined"
                fullWidth
                disabled={isEveningDisabled}
              />
            </Grid>

            <Grid item xs={6}>
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
                name="amount"
                value={user.amount}
                type="number"
                label="Amount"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
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

