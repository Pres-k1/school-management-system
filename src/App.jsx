
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import Studentdirectorypage from "./pages/Studentdirectory.page";
import Financemanagement from "./pages/financemangement.page";
import AcademicManagement from "./pages/academicmanagement.page";
import Communicationspage from "./pages/communications.page";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <SearchProvider>
            <NotificationProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/students" replace />} />
                <Route path="/students" element={<Studentdirectorypage />} />
                <Route path="/finance" element={<Financemanagement />} />
                <Route path="/academic" element={<AcademicManagement />} />
                <Route path="/communications" element={<Communicationspage />} />
              </Routes>
            </NotificationProvider>
          </SearchProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;