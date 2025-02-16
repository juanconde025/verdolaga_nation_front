import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Post } from './components/Post';
import { Notifications } from './components/Notifications';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// Home Component
export function Home() {
  return <div>Home - Aquí irán los posts del feed</div>;
}

// Profile Component
export function Profile() {
  return <div>Profile - Información del usuario y sus posts</div>;
}

// Post Component
export function Post() {
  return <div>Post - Vista individual del post</div>;
}

// Notifications Component
export function Notifications() {
  return <div>Notifications - Lista de notificaciones</div>;
}

// Navbar Component
export function Navbar() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/profile/johndoe">Profile</a>
      <a href="/notifications">Notifications</a>
    </nav>
  );
}
