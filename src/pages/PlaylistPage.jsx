import { useQuery } from "@tanstack/react-query";
import { playlistsStore } from "../store/PlaylistsStore";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Avatar,
  CardMedia,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PlaylistPage() {
  const selectedPlaylist = playlistsStore.selectedPlaylist;
  const navigator = useNavigate();

  if (!selectedPlaylist) {
    return (
      <Alert severity="error">Playlist no seleccionada</Alert>
    );
  }

  const { data: tracks, isLoading, error, refetch } = useQuery({
    queryKey: ["tracks", selectedPlaylist.id],
    queryFn: () =>
      fetch(
        `http://localhost:8080/api/v1/playlists/${selectedPlaylist.id}/tracks`
      ).then((res) => res.json()),
    enabled: !!selectedPlaylist,
  });

  function handleDeleteTrack(trackId) {
    fetch(
      `http://localhost:8080/api/v1/playlists/${selectedPlaylist.id}/tracks/${trackId}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        refetch();
        console.log("Track deleted successfully");

      } else {
        console.error("Error deleting track");
      }
    });
  }

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Error loading tracks</Typography>
      </Box>
    );

  return (
    <Container maxWidth="sm" >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {selectedPlaylist.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mood: {selectedPlaylist.mood}
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={2} sx={{ p: 1, mb: 4 }}>
        <Typography variant="h6">Canciones</Typography>
        <List>
          {tracks &&
            tracks.map((track) => (
              <ListItem key={track.id} divider>
                <ListItemAvatar>
                  <Avatar>
                    <CardMedia
                      component="img"
                      image={track.albumCover}
                      alt={track.title}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={track.title}
                  secondary={track.artist || ""}
                />
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteTrack(track.id)}
                >
                  <DeleteIcon  />
                </Button>
              </ListItem>

            ))}
        </List>
      </Paper>

      <Button variant="contained" onClick={() => { navigator(`/playlists/${selectedPlaylist.id}/add-song`) }}>Agregar Canciones</Button>

    </Container>
  );
}