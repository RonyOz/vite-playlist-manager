import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PlaylistCard from "../components/PlaylistCard";

export default function HomePage() {

  const { data: playlists, isLoading, error } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => 
      axios.get('http://localhost:8080/api/v1/playlists').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading playlists</div>;

  return (
    <Container>
      <h1>Playlists</h1>
      <Container>
        {playlists && playlists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </Container>
    </Container>
  );
}