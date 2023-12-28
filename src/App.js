import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/NavBar';
import Companies from './components/Companies';
import CompanyDetail from './components/CompanyDetail';
import Jobs from './components/Jobs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import { GuestRoute } from './components/GuestRoute';
import { ProtectedRoute } from './components/ProtectedRoute';

/**
 * Layout component to make sure the NavBar is in every route
 */
function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
            <Route path="/companies/:handle" element={<ProtectedRoute><CompanyDetail /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;