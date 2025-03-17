import { Container, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { addGroup, deleteGroup, getGroups } from "../services/groupService";

interface Group {
  _id?: string;
  name: string;
  faculty: string;
  year: number;
  semester: number;
  maxStudents: number;
}

const GroupManagement = () => {

  const [group, setGroups] = useState<Group[]>([]);
  const [formData, setFromData] = useState<Group>({
    name: "",
    faculty: "",
    year: 0,
    semester: 0,
    maxStudents: 60
  });

  // fetch groups wgen the compoent loads
  useEffect(() => {
    fetchGroups();
  }, []);

  // implementing fetch group function 
  const fetchGroups = async() => {
    const data = await getGroups();
    setGroups(data);
  };

  // inplut change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  // submission handler
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await addGroup(formData);
    fetchGroups(); // this will refresh the list 
    setFromData({
      name: "",
      faculty: "",
      year: 0,
      semester: 0,
      maxStudents: 60
    }); // reset the form
  };

  // delete handler
  const handleDelete = async(id?: string) => {
    if(id) {
      await deleteGroup(id);
      fetchGroups(); // this will refresh the list 
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Groups
      </Typography>

      {/* Form to add group */}
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Group Name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal"
          required
         />
        <TextField 
          label="Faculty/Department"
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal"
          required
        />
        <TextField 
          label="Year" 
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange} 
          variant="outlined" 
          fullWidth 
          margin="normal"
          required
        />
        <TextField 
          label="Semester"
          name="semester"
          type="number" 
          value={formData.semester}
          onChange={handleChange}
          variant="outlined" 
          fullWidth 
          margin="normal" 
          required
        />

        {/* need to be modify this not should be a textfield */}
        <TextField 
          label="Max Students (60)" 
          type="number" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
        />

        <Button
          type="submit"
          variant="contained" 
          color="primary" 
          fullWidth
        >
          Add Group
        </Button>
      </form>
      
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
          {group.map((grp) => (
            <TableRow key={grp._id}>
              <TableCell>{grp.name}</TableCell>
              <TableCell>{grp.faculty}</TableCell>
              <TableCell>{grp.year}</TableCell>
              <TableCell>{grp.semester}</TableCell>
              <TableCell>
                <Button color="secondary">Edit</Button>
                <Button color="error" onClick={() => handleDelete(grp._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default GroupManagement;

// run timr error - not adding groups into the table 
