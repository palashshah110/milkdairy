import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Users from "./Componets/Users";
import Login from "./Componets/Login";
import MilkInward from "./Componets/MilkInward";
import MilkOutward from "./Componets/MilkOutward";

export default function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/MilkInward" element={<MilkInward />} />
            <Route path="/MilkOutward" element={<MilkOutward />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}
