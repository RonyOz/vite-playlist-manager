import { useNavigate } from "react-router-dom";
import { playlistsStore } from "../store/PlaylistsStore";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PlaylistCard = ({ playlist }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        playlistsStore.selectedPlaylist = playlist;
        navigate(`/playlists/${playlist.id}`);
    };

    return (
        <Card sx={{ margin: 2 }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {playlist.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Mood: {playlist.mood}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PlaylistCard;