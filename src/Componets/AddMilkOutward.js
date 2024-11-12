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
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const AddMilkOutward = () => {
  const cowMilkRate = 60;
  const buffaloMilkRate = 70;

  const [user, setUser] = useState({
    dates: new Date().toISOString().split("T")[0],
    shift: "",
    fullName: null,
    cowMilk: "",
    buffaloMilk: "",
    cowAmount: "",
    buffaloAmount: "",
  });

  const [fullNameOptions, setFullNameOptions] = useState([]);
  const [loading, setLoading] = useState(false)
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
    setLoading(true); // Start loading

    const data = {
      dates: user.dates,
      shift: user.shift,
      fullName: user.fullName,
      cowMilk: user.cowMilk,
      buffaloMilk: user.buffaloMilk,
      cowAmount: user.cowAmount,
      buffaloAmount: user.buffaloAmount,
    };

    try {
      await axios.post("https://mymilkapp.glitch.me/milkOutward", data);
      toast.success("Outward Added Successfully");
      setUser({
        dates: new Date().toISOString().split("T")[0],
        shift: user.shift,
        fullName: "",
        cowMilk: "",
        buffaloMilk: "",
        cowAmount: "",
        buffaloAmount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add outward.");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  console.log(user)
  // Fetch user data for the autocomplete
  async function getUserData() {
    try {
      const response = await axios.get("http://mymilkapp.glitch.me/Users");
      const data = response.data.map((item, index) => ({
        _id: item._id,
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
                getOptionLabel={(option) => (option ? option.fullName : "")}  // Handle null cases
                renderInput={(params) => <TextField {...params} label="Full Name" />}
                onChange={(event, newValue) => {
                  setUser((prevState) => ({
                    ...prevState,
                    fullName: newValue ? newValue.fullName : "", // Update user.fullName
                  }));
                }}
                value={
                  fullNameOptions.find((option) => option.fullName === user.fullName) || null
                } // Ensure value matches selected fullName or defaults to null
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
                disabled={loading} 
              >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </>
  );
};

export default AddMilkOutward;