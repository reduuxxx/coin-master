import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Badge } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import { DataContext } from "../utils/ContextFile";
const pages = ["Home", "Market"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const { walletConnection,account } = useContext(DataContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink to="/" className="text-white">
              Coin-Master
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Badge badgeContent={4} color="secondary">
                  <MailIcon color="action" />
                </Badge>
                <Typography textAlign="center">
                  <NavLink to="/watchlist" className="text-white">
                    Your WatchList
                  </NavLink>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Coin-Master
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem>
              <Typography textAlign="center">
                <NavLink to="/watchlist" className="text-white">
                  Your WatchList
                </NavLink>
              </Typography>
              <Badge
                badgeContent={
                  JSON.parse(localStorage.getItem("watchList")) &&
                  JSON.parse(localStorage.getItem("watchList")).length
                    ? JSON.parse(localStorage.getItem("watchList")).length
                    : 0
                }
              >
                <MailIcon color="white" className="mx-2" />
              </Badge>
            </MenuItem>
          </Box>

          <Button variant="outlined" color="inherit" onClick={walletConnection}>
            {account ? account.toString().slice(0,10) + "..." + account.toString().slice(35) : "Connect Wallet"}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
