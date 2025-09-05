import { Card, CardContent, Typography } from "@mui/material";

// Proje bilgisini gösteren kart componenti.
const ProjectCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 200, margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
