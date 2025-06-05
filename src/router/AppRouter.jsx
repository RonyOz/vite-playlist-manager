import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PlaylistPage from '../pages/PlaylistPage';
import AddSongPage from '../pages/AddSongPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/playlists/:playlistId' element={<PlaylistPage />} />  
        <Route path='/playlists/:playlistId/add-song' element={<AddSongPage />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

