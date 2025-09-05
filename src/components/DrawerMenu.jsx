import { Drawer, List, ListItem, ListItemText, ListSubheader, Button, Box } from "@mui/material";

// Sol menüyü oluşturan Drawer componenti.
const DrawerMenu = ({ selected, setSelected, onCreateProjectClick }) => {
  // Ana başlık ve alt menülerin sıralı dizisi
  const menuItems = [
    { label: "Projeler", isHeader: true },
    { label: "Tüm Projeler", value: 0 },
    { label: "Tamamlanmış", value: 1 },
    { label: "Devam Eden", value: 2 },
    { label: "Yapılacak", value: 3 },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': { width: 200 } }}>
      <List>
        {/* Projeler başlığı */}
        <ListSubheader sx={{ fontWeight: "bold", fontSize: 18, bgcolor: "inherit" }}>
          Projeler
        </ListSubheader>
        {/* Alt menüler */}
        {menuItems.slice(1).map((item) => (
          <ListItem
            button
            key={item.label}
            selected={selected === item.value}
            onClick={() => setSelected(item.value)}
            sx={{ pl: 3 }} // Alt menü gibi içeri girinti
          >
            <ListItemText primary={`- ${item.label}`} />
          </ListItem>
        ))}
      </List>
      {/* En alta buton */}
      <Box sx={{ position: "absolute", bottom: 24, left: 0, width: "75%", px: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onCreateProjectClick}
        >
          Proje Oluştur
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
