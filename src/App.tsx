import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import EventsPage from './pages/eventsPage/EventsPage';
import Layout from './Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Apollo Client ayarları
const client = new ApolloClient({
  uri: 'https://api.hophop.com.tr/activity/graphql', // GraphQL API endpoint'i
  cache: new InMemoryCache(),
});

const theme = createTheme({
    palette: {
      primary: {
        main: '#007bff', // Mavi birincil renk
      },
      secondary: {
        main: '#ff4081', // Pembe ikincil renk
      },
    },
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    shape: {
      borderRadius: 8, // Varsayılan kenar yuvarlama
    },
  });

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Layout'un içine yerleşecek sayfalar */}
            <Route index element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/aktiviteler" element={<EventsPage />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
