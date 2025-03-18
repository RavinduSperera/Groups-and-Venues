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
  MenuItem,
  Select,
} from "@mui/material";
import { getVenues, addVenue, deleteVenue, updateVenue } from "../services/venueService";

interface Venue {
  _id?: string;
  faculty: string;
  building: string;
  hallName: string;
  type: "Lecture" | "Tutorial" | "Lab";
  capacity: number;
}

const VenueManagement = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [formData, setFormData] = useState<Venue>({
    faculty: "",
    building: "",
    hallName: "",
    type: "Lecture",
    capacity: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    const data = await getVenues();
    setVenues(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && editingVenueId) {
      await updateVenue(editingVenueId, formData);
    } else {
      await addVenue(formData);
    }
    fetchVenues();
    handleCloseModal();
  };

  const handleEdit = (venue: Venue) => {
    setFormData(venue);
    setEditingVenueId(venue._id || null);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      await deleteVenue(id);
      fetchVenues();
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditingVenueId(null);
    setFormData({ faculty: "", building: "", hallName: "", type: "Lecture", capacity: 0 });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Venue Management
      </Typography>

      {/* Button to open modal for adding a new venue */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Venue
      </Button>

      {/* Modal for Adding/Editing */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{editMode ? "Edit Venue" : "Add Venue"}</DialogTitle>
        <DialogContent>
          <TextField label="Faculty/Department" name="faculty" value={formData.faculty} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Building Name" name="building" value={formData.building} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Hall Name" name="hallName" value={formData.hallName} onChange={handleChange} fullWidth margin="normal" required />
          <Select name="type" value={formData.type}>  {/** here we need to be worry - can not use onchange(handleChange) */}
            <MenuItem value="Lecture">Lecture</MenuItem>
            <MenuItem value="Tutorial">Tutorial</MenuItem>
            <MenuItem value="Lab">Lab</MenuItem>
          </Select>
          <TextField label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} fullWidth margin="normal" required />
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

      {/* Table to display venues */}
      <Typography variant="h5" style={{ marginTop: 20 }}>
        Existing Venues
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Faculty</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Hall Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue._id}>
              <TableCell>{venue.faculty}</TableCell>
              <TableCell>{venue.building}</TableCell>
              <TableCell>{venue.hallName}</TableCell>
              <TableCell>{venue.type}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleEdit(venue)}>
                  Edit
                </Button>
                <Button color="error" onClick={() => handleDelete(venue._id)}>
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

export default VenueManagement;
