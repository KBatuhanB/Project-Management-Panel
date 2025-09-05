import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const STATUS_OPTIONS = [
  "Tamamlanmış",
  "Devam Eden",
  "Yapılacak"
];

const EditProjectModal = ({ open, onClose, onSave, project }) => {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        status: project.status || "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name && form.status) {
      onSave({ ...project, ...form });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Projeyi Düzenle</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <TextField
          margin="normal"
          label="Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Start Date"
          name="startDate"
          type="date"
          fullWidth
          value={form.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          label="End Date"
          name="endDate"
          type="date"
          fullWidth
          value={form.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          select
          label="Status"
          name="status"
          fullWidth
          value={form.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleSubmit}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProjectModal;