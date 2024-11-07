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
import Autocomplete from "@mui/material/Autocomplete";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMilkOutward = () => {
  const navigate = useNavigate();
  const cowMilkRate = 60;
  const buffaloMilkRate = 70;

  const [user, setUser] = useState({
    dates: new Date().toISOString().split("T")[0],
    shift: "",
    fullName: "",
    cowMilk: "",
    buffaloMilk: "",
    cowAmount: "",
    buffaloAmount: "",
  });

  const [fullNameOptions, setFullNameOptions] = useState([]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prevState) => {
      const updatedUser = { ...prevState, [name]: value };

      // Calculate amounts based on milk quantity
      const cowMilkQuantity = parseFloat(updatedUser.cowMilk) || 0;
      const buffaloMilkQuantity = parseFloat(updatedUser.buffaloMilk) || 0;

      const cowAmount = (cowMilkQuantity * cowMilkRate).toFixed(2);
      const buffaloAmount = (buffaloMilkQuantity * buffaloMilkRate).toFixed(2);

      return {
        ...updatedUser,
        cowAmount,
        buffaloAmount,
      };
    });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      dates: user.dates,
      shift: user.shift,
      fullName: user.fullName,
      cowMilk: user.cowMilk,
      buffaloMilk: user.buffaloMilk,
      cowAmount: user.cowAmount,
      buffaloAmount: user.buffaloAmount,
    };
    await axios
      .post("https://mymilkapp.glitch.me/milkOutward", data)
      .then(() => {
        navigate("/MilkOutward");
      })
      .catch((error) => console.log(error));
  }

  // Fetch user data for the autocomplete
  async function getUserData() {
    try {
      const response = await axios.get("https://mymilkapp.glitch.me/Users");
      const data = response.data.map((item, index) => ({
        id: index,
        fullName: item.fullName,
        role: item.role,
      }));
      const filteredUsers = data.filter((item) => item.role === "customer" || item.role === "shop");
      setFullNameOptions(filteredUsers);
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
      <Paper elevation={3} style={{ padding: "20px", width: "700px", margin: "auto", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Add Outward Milk
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
              <TextField
                label="Pick a Date"
                type="date"
                value={user.dates}
                onChange={handleChange}
                name="dates"
                fullWidth
                InputLabelProps={{ shrink: true }} // Keeps the label above the date input
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="shift-label">Shift</InputLabel>
                <Select
                  labelId="shift-label"
                  value={user.shift}
                  onChange={handleChange}
                  name="shift"
                  label="Shift"
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="fullName"
                options={fullNameOptions}
                getOptionLabel={(option) => option.fullName}
                renderInput={(params) => <TextField {...params} label="Full Name" />}
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
                value={user.cowMilk}
                onChange={handleChange}
                name="cowMilk"
                type="number"
                label="Cow Milk (L)"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={user.buffaloMilk}
                onChange={handleChange}
                name="buffaloMilk"
                type="number"
                label="Buffalo Milk (L)"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="cowAmount"
                value={user.cowAmount}
                type="number"
                label="Cow Milk Amount"
                variant="outlined"
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="buffaloAmount"
                value={user.buffaloAmount}
                type="number"
                label="Buffalo Milk Amount"
                variant="outlined"
                InputProps={{ readOnly: true }}
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
