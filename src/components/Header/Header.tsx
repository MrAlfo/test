import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const pages = [
  { name: "Anasayfa", link: "/" },
  { name: "Aktiviteler", link: "/aktiviteler" },
  { name: "Hakkımızda", link: "/hakkımızda" },
  { name: "S.S.S", link: "/s.s.s" },
  { name: "İletişim", link: "/iletişim" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#ffffff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#222222",
              textDecoration: "none",
              letterSpacing: "0.1em",
              fontSize: "24px",
            }}
          >
            <img src={Logo} alt="" width={"128px"} />
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#222222" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={page.link}
                    sx={{
                      textDecoration: "none",
                      color: "#222222",
                      fontWeight: 600,
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Navbar Brand for Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#222222",
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            HopHop
          </Typography>

          {/* Desktop Menu */}
          <Box justifyContent="center" sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                sx={{
                  my: 2,
                  color: "#222222",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.05)",
                    color: "#555555",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Login Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                my: 2,
                color: "#222222",
                borderColor: "#222222",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                "&:hover": {
                  bgcolor: "#222222",
                  color: "#ffffff",
                  borderColor: "#222222",
                },
              }}
            >
              Giriş Yap
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
