import React, { useState, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProjectProvider, ProjectContext } from "./context/ProjectContext";
import DrawerMenu from "./components/DrawerMenu";
import Dashboard from "./components/Dashboard";
import CreateProjectModal from "./components/CreateProjectModal";
import { Alert } from "@mui/material";

const queryClient = new QueryClient();

// Provider dışında context'e erişmek için iç içe component
const AppContent = () => {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addProjectErrorAlert, setaddProjectErrorAlert] = useState(false);
  const { addProject, addProjectError } = useContext(ProjectContext);

  // Yeni proje ekleme fonksiyonu
  const handleCreateProject = async (form) => {
    try {
      await addProject({
        name: form.name,
        startDate: form.startDate,
        endDate: form.endDate,
        status: form.status,
      });
      setModalOpen(false); // Sadece başarılı olursa modalı kapat
    } catch (e) {
      setaddProjectErrorAlert(true);
    }
  };

  return (
    <>
      <DrawerMenu
        selected={selected}
        setSelected={setSelected}
        onCreateProjectClick={() => setModalOpen(true)}
      />
      <Dashboard selected={selected} />
      <CreateProjectModal
        open={modalOpen}
        onClose={() => {
          setaddProjectErrorAlert(false);
          setModalOpen(false);
        }}
        onCreate={handleCreateProject}
      />
      {addProjectError && addProjectErrorAlert &&(
        <Alert severity="error" sx={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          {addProjectError}
        </Alert>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  </QueryClientProvider>
);

export default App;
