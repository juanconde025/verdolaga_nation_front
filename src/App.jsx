import Navbar from './components/Navbar'; 
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  );
}