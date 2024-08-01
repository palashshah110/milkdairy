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

const AddMilkInward = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    fat: "",
    litre: "",
    fatLitre: "",
    amount: "",
    milk: "",
    morning: "",
    evening: "",
  });

  const [options, setOptions] = useState([]);
  const [isMorningDisabled, setIsMorningDisabled] = useState(false);
  const [isEveningDisabled, setIsEveningDisabled] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get("https://mymilkapp.glitch.me/users");
        const AllUsers = response.data.map((user, index) => ({
          ...user,
          id: index,
        }));
        const AllFilterUsers = AllUsers.filter(
          (item) => item.role === "milkman"
        );
        setOptions(AllFilterUsers);
      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    }

    fetchOptions();
  }, []);

  useEffect(() => {
    // Calculate fatLitre whenever fat or litre changes
    const fatLitre = user.fat * user.litre;
    setUser((prevState) => ({
      ...prevState,
      fatLitre: fatLitre,
      amount: fatLitre * 10,
    }));
  }, [user.fat, user.litre]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  useEffect(() => {
    // Determine if fields should be disabled based on the current time
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 11) {
      setIsEveningDisabled(true);
      setIsMorningDisabled(false);
    } else if (currentHour >= 16 && currentHour < 21) {
      setIsMorningDisabled(true);
      setIsEveningDisabled(false);
    } else {
      setIsMorningDisabled(false);
      setIsEveningDisabled(false);
    }
  }, []);

  function handleAutocompleteChange(event, value) {
    setUser({
      ...user,
      fullName: value ? value.fullName : "",
    });
  }

  async function handleSubmit() {
    const data = {
      fullName: user.fullName,
      fat: user.fat,
      litre: user.litre,
      fatLitre: user.fat * user.litre,
      amount: user.amount,
      milk: user.milk,
      morning: user.morning,
      evening: user.evening,
    };

    console.log(data);

    try {
      const response = await axios.post(
        "https://mymilkapp.glitch.me/milkInward",
        data
      );
      if (response) {
        alert("Milk Inward Added");
      }
    } catch (error) {
      console.log(error);
    }

    navigate("/MilkInward");
  }

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
          Add Inward Milk
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
                options={options}
                getOptionLabel={(option) => (option ? option.fullName : "")}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.fullName}
                  </li>
                )}
                value={
                  options.find((opt) => opt.fullName === user.fullName) || null
                }
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={user.fat}
                onChange={handleChange}
                name="fat"
                label="Fat"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={user.litre}
                onChange={handleChange}
                name="litre"
                label="Litre"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={user.fatLitre}
                onChange={handleChange}
                name="fatLitre"
                label="Fat Litre"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={user.amount}
                onChange={handleChange}
                name="amount"
                label="Amount"
                variant="outlined"
                fullWidth
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

export default AddMilkInward;
