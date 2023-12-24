import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/NavBar';
import Companies from './components/Companies';
import CompanyDetail from './components/CompanyDetail';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout({ children }) {
  return (
    <div style={{ backgroundColor: 'white' }}>
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
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;