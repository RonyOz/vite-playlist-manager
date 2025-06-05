import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { playlistsStore } from "../store/PlaylistsStore";
import {
  CircularProgress,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

export default function AddSongPage() {
  const selectedPlaylist = playlistsStore.selectedPlaylist;
  const navigator = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const searchTracks = () => {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    setSearchError("");
    setSearchResults([]);
    fetch(
      `http://localhost:8080/api/v1/deezer/search?q=${encodeURIComponent(
        searchQuery
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setSearchResults(data.data);
        } else {
          setSearchError("No se encontraron canciones para la búsqueda.");
        }
      })
      .catch((error) => {
        setSearchError("Error buscando canciones.");
      })
      .finally(() => setSearchLoading(false));
  };

  const handleAddTrack = (track) => {
    fetch(
      `http://localhost:8080/api/v1/playlists/${selectedPlaylist.id}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(track),
      }
    )
      .then(() => {
        setSearchResults([]);
        setSearchQuery("");
        navigator(`/playlists/${selectedPlaylist.id}`);
      })
      .catch((error) => {
        console.error("Error adding track:", error);
      });
  };

  if (!selectedPlaylist) {
    return (
      <Alert severity="error">Playlist no seleccionada</Alert>
    );
  }

  return (
    <>
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

      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar nueva canción
        </Typography>
        <Box display="flex" gap={2} alignItems="center" mb={2}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
            placeholder="Buscar canción..."
            onKeyDown={(e) => {
              if (e.key === "Enter") searchTracks();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchTracks}
            disabled={!searchQuery.trim() || searchLoading}
          >
            {searchLoading ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </Box>
        {searchError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {searchError}
          </Alert>
        )}
        {searchResults.length > 0 && (
          <Paper elevation={1} sx={{ p: 1, mt: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Resultados de búsqueda
            </Typography>
            <List>
              {searchResults.map((track) => (
                <ListItem
                  key={track.id}
                  divider
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAddTrack({
                        id: track.id,
                        title: track.title,
                        duration: track.duration,
                        artistName: track.artist.name,
                        artistPicture: track.artist.picture,
                        albumCover: track.album.cover,
                        albumTitle: track.album.title,
                        rank: track.rank
                      })}
                    >
                      Agregar
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={track.album?.cover_medium} alt={track.title} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={track.title}
                    secondary={track.artist?.name}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Paper>
    </>
  )
}