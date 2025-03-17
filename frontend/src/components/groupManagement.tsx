import { Container, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const GroupManagement = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Group Management
      </Typography>

      {/* Form to add group */}
      <TextField label="Group Name" variant="outlined" fullWidth margin="normal" />
      <TextField label="Faculty/Department" variant="outlined" fullWidth margin="normal" />
      <TextField label="Year" type="number" variant="outlined" fullWidth margin="normal" />
      <TextField label="Semester" type="number" variant="outlined" fullWidth margin="normal" />
      <TextField label="Max Students (60)" type="number" variant="outlined" fullWidth margin="normal" />

      <Button variant="contained" color="primary" fullWidth>
        Add Group
      </Button>

      {/* Table to display groups */}
      <Typography variant="h5" style={{ marginTop: 20 }}>
        Existing Groups
      </Typography>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Semester</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Sample row (Replace with actual data) */}
          <TableRow>
            <TableCell>CS-2025</TableCell>
            <TableCell>Computer Science</TableCell>
            <TableCell>2</TableCell>
            <TableCell>1</TableCell>
            <TableCell>
              <Button color="secondary">Edit</Button>
              <Button color="error">Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default GroupManagement;
