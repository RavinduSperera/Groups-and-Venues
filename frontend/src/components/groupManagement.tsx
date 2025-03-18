import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { getGroups, addGroup, deleteGroup, updateGroup } from "../services/groupService";

interface Group {
  _id?: string;
  name: string;
  faculty: string;
  year: number;
  semester: number;
  maxStudents: number;
}

const GroupManagement = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [formData, setFormData] = useState<Group>({
    name: "",
    faculty: "",
    year: 0,
    semester: 0,
    maxStudents: 60,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const data = await getGroups();
    setGroups(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && editingGroupId) {
      await updateGroup(editingGroupId, formData);
    } else {
      await addGroup(formData);
    }
    fetchGroups();
    handleCloseModal();
  };

  const handleEdit = (group: Group) => {
    setFormData(group);
    setEditingGroupId(group._id || null);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      await deleteGroup(id);
      fetchGroups();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditingGroupId(null);
    setFormData({ name: "", faculty: "", year: 0, semester: 0, maxStudents: 60 });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Group Management
      </Typography>

      {/* Button to open modal for adding a new group */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Group
      </Button>

      {/* Modal for Adding/Editing */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Edit Group" : "Add Group"}</DialogTitle>
        
        <DialogContent>
          <TextField label="Group Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Faculty/Department" name="faculty" value={formData.faculty} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Year" name="year" type="number" value={formData.year} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Semester" name="semester" type="number" value={formData.semester} onChange={handleChange} fullWidth margin="normal" required />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          
          <Button onClick={handleSubmit} color="primary">
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>

      </Dialog>

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
          {groups.map((group) => (
            <TableRow key={group._id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.faculty}</TableCell>
              <TableCell>{group.year}</TableCell>
              <TableCell>{group.semester}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEdit(group)}>
                  Edit
                </Button>
                <Button color="error" onClick={() => handleDelete(group._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </Container>
  );
};

export default GroupManagement;
