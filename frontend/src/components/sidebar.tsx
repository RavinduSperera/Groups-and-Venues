import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        
        <ListItemButton component={Link} to="/groups">
          <ListItemText primary="Group Management" />
        </ListItemButton>

        <ListItemButton component={Link} to="/venues">
          <ListItemText primary="Venue Management" />
        </ListItemButton>

        <ListItemButton component={Link} to="/reports">
          <ListItemText primary="Reports" />
        </ListItemButton>

      </List>
    </Drawer>
  );
};

export default Sidebar;

