import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
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

const CreateProjectModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Yapılacak", // Default status
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name) {
      onCreate({ ...form, status: "Yapılacak" });
      setForm({ name: "", startDate: "", endDate: "", status: "" });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Proje Oluştur</Typography>
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
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleSubmit}
        >
          Oluştur
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;