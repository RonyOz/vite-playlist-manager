import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
    const navigate = useNavigate();

    const onHandleClick = (id) => {
        navigate(`/playlists/${id}`);
    }

    return (
        <div className="playlist-card">
            <a
                href="#"
                onClick={e => {
                    e.preventDefault();
                    if (onHandleClick) onHandleClick(playlist.id);
                }}
            >
                {playlist.name} - mood: {playlist.mood}
            </a>
        </div>
    );
};

export default PlaylistCard;