import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid, Snackbar, Alert } from "@mui/material";
import { ProjectContext } from "../context/ProjectContext";
import ProjectCard from "./ProjectCard";
import SimplePieChart from "./SimplePieChart";
import ProjectTable from "./ProjectTable";
import EditProjectModal from "./EditProjectModal";

// Dashboard ana içeriği.
const Dashboard = ({ selected }) => {
  const { projects, deleteProject, updateProject } = useContext(ProjectContext); 
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selected === 0) {
      setMessage("Tüm Projeler görüntüleniyor");
    } else {
      setMessage(`${projects[selected - 1]?.name || ""} görüntüleniyor`);
    }
    setOpen(true);
  }, [selected, projects]);

  // Pie chart için veri hazırla (status bazlı)
  const statusCounts = {
    "Tamamlanmış": 0,
    "Devam Eden": 0,
    "Yapılacak": 0,
  };
  projects.forEach((p) => {
    if (statusCounts[p.status] !== undefined) {
      statusCounts[p.status] += 1;
    }
  });
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Alt menüye göre tabloya gösterilecek projeyi filtrele
  let filteredProjects = [];
  if (selected === 0) {
    filteredProjects = projects;
  } else if (selected === 1) {
    filteredProjects = projects.filter((p) => p.status === "Tamamlanmış");
  } else if (selected === 2) {
    filteredProjects = projects.filter((p) => p.status === "Devam Eden");
  } else if (selected === 3) {
    filteredProjects = projects.filter((p) => p.status === "Yapılacak");
  }

  const handleDeleteProject = (id) => {
    deleteProject(id); 
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const handleSaveProject = async (updatedProject) => {
    await updateProject(updatedProject);
    setEditModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Box sx={{ marginLeft: 30, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Tüm Projeler seçiliyse pasta grafik ve kartlar */}
      {selected === 0 ? (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SimplePieChart data={pieData} />
            </Grid>
            {/* Statü gruplarına göre 3 adet ProjectCard */}
            <Grid item>
              <ProjectCard title="Tamamlanmış" value={statusCounts["Tamamlanmış"]} />
            </Grid>
            <Grid item>
              <ProjectCard title="Devam Eden" value={statusCounts["Devam Eden"]} />
            </Grid>
            <Grid item>
              <ProjectCard title="Yapılacak" value={statusCounts["Yapılacak"]} />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: 12,
              padding: 3,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography>Tüm projelerin özeti burada yer alır.</Typography>
          </Box>
          <ProjectTable projects={projects} onDelete={handleDeleteProject} onEdit={handleEditProject} />
        </>
      ) : (
        // Diğer menülerde tablo göster
        <ProjectTable projects={filteredProjects} onDelete={handleDeleteProject} onEdit={handleEditProject} />
      )}

      <EditProjectModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveProject}
        project={selectedProject}
      />

      {/* Kullanıcıya bilgi mesajı */}
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;