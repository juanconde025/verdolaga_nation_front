import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <ThemeProvider>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </ThemeProvider>
  );
}
