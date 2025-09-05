import React, { createContext } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// Proje verilerini ve fonksiyonlarını paylaşmak için context oluşturuyoruz.
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Projeleri çekmek için useQuery
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/projects");
      return res.data;
    },
  });

  // Proje ekle (mutation)
  const [addError, setAddError] = React.useState(null);
  const addProjectMutation = useMutation({
    mutationFn: async (project) => {
      const res = await axios.post("http://localhost:5000/api/projects", project, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      setAddError(null);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        setAddError("Bu isimde bir proje zaten var!");
      } else {
        setAddError("Proje eklenirken bir hata oluştu.");
      }
    },
  });

  // Proje sil (mutation)
  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Proje silinirken bir hata oluştu:", error);
    },
  });

  // Proje güncelle (mutation)
  const updateProjectMutation = useMutation({
    mutationFn: async (project) => {
      await axios.put(`http://localhost:5000/api/projects/${project._id}`,
        project,
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Proje güncellenirken bir hata oluştu:", error);
    },
  });

  return (
    <ProjectContext.Provider value={{
      projects,
      isLoading,
      error,
      addProject: addProjectMutation.mutateAsync,
      addProjectError: addError,
      deleteProject: deleteProjectMutation.mutateAsync,
      updateProject: updateProjectMutation.mutateAsync,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

