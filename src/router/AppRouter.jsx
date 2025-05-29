import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/playlists/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

