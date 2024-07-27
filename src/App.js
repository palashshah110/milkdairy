import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Users from "./Componets/Users";
import Login from "./Componets/Login";
import MilkInward from "./Componets/MilkInward";
import MilkOutward from "./Componets/MilkOutward";
import AddMilkOutward from "./Componets/AddMilkOutward";
import AddMilkInward from "./Componets/AddMilkInward";
import AddUsers from "./Componets/AddUsers";

export default function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/AddUsers" element={<AddUsers />} />
            <Route path="/MilkInward" element={<MilkInward />} />
            <Route path="/MilkOutward" element={<MilkOutward />} />
            <Route path="/AddMilkOutward" element={<AddMilkOutward />} />
            <Route path="/AddMilkInward" element={<AddMilkInward />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}
