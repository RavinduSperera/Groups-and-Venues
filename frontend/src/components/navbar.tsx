import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Academic Timetable Generator</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
