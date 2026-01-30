import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 65px)' }}>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
