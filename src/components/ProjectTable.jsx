import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Sıralama fonksiyonu
const getComparator = (order, orderBy) => {
  return (a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];
    // Tarih ise karşılaştırmayı tarih olarak yap
    if (orderBy === "startDate" || orderBy === "endDate") {
      if (aValue) {
        aValue = new Date(aValue);
      } else {
        aValue = new Date(0);
      }
      if (bValue) {
        bValue = new Date(bValue);
      } else {
        bValue = new Date(0);
      }
    }
    // String ise küçük/büyük harf duyarsız karşılaştır
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (aValue < bValue) {
      if (order === "asc") {
        return -1;
      } else {
        return 1;
      }
    }
    if (aValue > bValue) {
      if (order === "asc") {
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  };
};

const headCells = [
  { id: "name", label: "Proje İsmi" },
  { id: "startDate", label: "Başlama Tarihi" },
  { id: "endDate", label: "Bitiş Tarihi" },
  { id: "status", label: "Durum" },
];

const STATUS_OPTIONS = ["Yapılacak", "Devam Eden", "Tamamlanmış"];

// Proje listesini tablo olarak gösteren component
const ProjectTable = ({ projects, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [statusFilter, setStatusFilter] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    if (property === "status") return; // Durum sütununda sıralama yok
    const isAsc = orderBy === property && order === "asc";
    if (isAsc) {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setOrderBy(property);
  };

  // Filtrelenmiş projeler
  let filteredProjects;
  if (statusFilter.length === 0) {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter((p) => statusFilter.includes(p.status));
  }

  let sortedProjects;
  if (orderBy === "status") {
    sortedProjects = filteredProjects; // Durumda sıralama yok
  } else {
    sortedProjects = [...filteredProjects].sort(getComparator(order, orderBy));
  }

  const paginatedProjects = sortedProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
        <InputLabel>Duruma Göre Filtrele</InputLabel>
        <Select
          multiple
          value={statusFilter}
          onChange={(e) => {
            let value;
            if (typeof e.target.value === "string") {
              value = e.target.value.split(",");
            } else {
              value = e.target.value;
            }
            setStatusFilter(value);
          }}
          input={<OutlinedInput label="Duruma Göre Filtrele" />}
          renderValue={(selected) => {
            if (Array.isArray(selected)) {
              return selected.join(", ");
            } else {
              return selected;
            }
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <MenuItem key={status} value={status}>
              <Checkbox checked={statusFilter.indexOf(status) > -1} />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ maxWidth: 700, mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  {headCell.id === "status" ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
              <TableCell align="center">Düzenle</TableCell>
              <TableCell align="center">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProjects.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.startDate || "-"}</TableCell>
                <TableCell>{p.endDate || "-"}</TableCell>
                <TableCell>{p.status || ""}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit && onEdit(p)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => onDelete && onDelete(p._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredProjects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </Box>
  );
};

export default ProjectTable;