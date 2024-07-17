import React from 'react'
import { CssBaseline,Toolbar,Typography,AppBar } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#6945FF" }}
      >
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h6" noWrap component="div">
          Admin Panal
          </Typography>
          <AccountCircleIcon/>
        </Toolbar>
      </AppBar>
      <Sidebar/>
      </>
  )
}
