import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CreateTrip } from './pages/trips/CreateTrip';
import { MyTrips } from './pages/trips/MyTrips';

import { ItineraryBuilder } from './pages/planner/ItineraryBuilder';
import { ItineraryView } from './pages/planner/ItineraryView';
import { Search } from './pages/search/Search';

import { Budget } from './pages/insights/Budget';
import { CalendarView } from './pages/planner/CalendarView';
import { SharedItinerary } from './pages/public/SharedItinerary';

import { Profile } from './pages/profile/Profile';
import SignupPage from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgetPassord';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { TripAnalytics } from './pages/admin/TripAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<TripAnalytics />} />
        </Route>

        {/* Main App Routes */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} /> {/* Using Login for signup for now */}
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<CreateTrip />} />
          <Route path="/planner/edit" element={<ItineraryBuilder />} />
          <Route path="/planner/view" element={<ItineraryView />} />
          <Route path="/planner/calendar" element={<CalendarView />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/shared/:id" element={<SharedItinerary />} />
          <Route path="/search" element={<Search />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
