import { React } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title }) => {
  document.title = title
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: '1', overflowY: 'auto' }}><ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="dark" style={{ paddingTop: '65px' }} />{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
