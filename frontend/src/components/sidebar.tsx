import { Card, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Card sx={{width: 300, mt: 1, mb: 1}}>
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
    </Card>
  );
};

export default Sidebar;

