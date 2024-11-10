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
import { toast, ToastContainer } from "react-toastify";

const AddMilkInward = () => {
  const [user, setUser] = useState({
    dates: new Date().toISOString().split("T")[0], // Default to today's date
    shift: "",
    fullName: "",
    buffaloRate: 70, 
    buffaloFat: "",
    buffaloLitre: "",
    buffaloTotal: "",
    cowRate: 60, 
    cowFat: "",
    cowLitre: "",
    cowTotal: "",
  });
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetching options for full name
    async function fetchOptions() {
      try {
        const response = await axios.get("https://mymilkapp.glitch.me/users");
        const users = response.data.filter((user) => user.role === "milkman");
        setOptions(users);
      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    // Calculate buffalo and cow totals
    const buffaloTotal = (user.buffaloFat * user.buffaloLitre * user.buffaloRate).toFixed(2);
    const cowTotal = (user.cowFat * user.cowLitre * user.cowRate).toFixed(2);

    setUser((prevState) => ({
      ...prevState,
      buffaloTotal,
      cowTotal,
    }));
  }, [user.buffaloFat, user.buffaloLitre,user.buffaloRate,user.cowRate, user.cowFat, user.cowLitre]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAutocompleteChange = (event, value) => {
    setUser({ ...user, fullName: value ? value.fullName : "" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      date: user.dates,
      shift: user.shift,
      fullName: user.fullName,
      buffalo: {
        rate: user.buffaloRate,
        fat: user.buffaloFat,
        litre: user.buffaloLitre,
        amount: user.buffaloTotal
      },
      cow: {
        rate: user.cowRate,
        fat: user.cowFat,
        litre: user.cowLitre,
        amount: user.cowTotal
      }
    };
    try {
      await axios.post("https://mymilkapp.glitch.me/milkInward", data);
      toast.success("Milk Inward Added");
      setUser({
        dates: new Date().toISOString().split("T")[0],
        shift: data.shift,
        fullName: "",
        buffaloRate: 70, 
        buffaloFat: "",
        buffaloLitre: "",
        buffaloTotal: "",
        cowRate: 60, 
        cowFat: "",
        cowLitre: "",
        cowTotal: "",
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        <Typography variant="h4" gutterBottom textAlign="center">
          Add Inward Milk
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                name="dates"
                value={user.dates}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Shift</InputLabel>
                <Select
                  name="shift"
                  value={user.shift}
                  onChange={handleChange}
                  label="Shift"
                >
                  <MenuItem value="morning" >
                    Morning
                  </MenuItem>
                  <MenuItem value="evening">
                    Evening
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={options}
                getOptionLabel={(option) => option.fullName || ""}
                renderInput={(params) => (
                  <TextField {...params} label="Full Name" variant="outlined" fullWidth />
                )}
                onChange={handleAutocompleteChange}
                value={options.find((opt) => opt.fullName === user.fullName) || null}
              />
            </Grid>

            {/* Buffalo Milk Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Buffalo Milk</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Rate"
                variant="outlined"
                fullWidth
                name="buffaloRate"
                value={user.buffaloRate}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fat"
                variant="outlined"
                fullWidth
                name="buffaloFat"
                value={user.buffaloFat}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Litre"
                variant="outlined"
                fullWidth
                name="buffaloLitre"
                value={user.buffaloLitre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Total"
                variant="outlined"
                fullWidth
                name="buffaloTotal"
                value={user.buffaloTotal}
                disabled
              />
            </Grid>

            {/* Cow Milk Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Cow Milk</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Rate"
                variant="outlined"
                fullWidth
                name="cowRate"
                value={user.cowRate}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fat"
                variant="outlined"
                fullWidth
                name="cowFat"
                value={user.cowFat}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Litre"
                variant="outlined"
                fullWidth
                name="cowLitre"
                value={user.cowLitre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Total"
                variant="outlined"
                fullWidth
                name="cowTotal"
                value={user.cowTotal}
                disabled
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
      <ToastContainer/>
    </>
  );
};

export default AddMilkInward;
