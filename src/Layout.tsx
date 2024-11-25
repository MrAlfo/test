import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Layout: React.FC = () => {
    const location = useLocation();
  

    const noHeaderFooterRoutes = ['/login', '/register'];
  
    const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <main>
        <Outlet />
      </main>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
