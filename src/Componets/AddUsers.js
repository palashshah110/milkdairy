import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUsers = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    role: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("https://mymilkapp.glitch.me/Users", user)
      .then((item)=>alert("User Added"))
      .catch((error) => console.log(error));
      setUser({
        fullName: "",
        email: "",
        mobileNumber: "",
        role: "",
      });
    
    navigate("/users");
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
          Add Users
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2} direction="row">
            <Grid item xs={6}>
              <TextField
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                type="text"
                label="Full Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                value={user.email}
                onChange={handleChange}
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleChange}
                type="number"
                label="Mobile Number"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="role"
                onChange={handleChange}
                value={user.role}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="shop">Shop</MenuItem>
                <MenuItem value="milkman">Milk Man</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Add Users
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default AddUsers;
