import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <h5 className="fw-bold mb-2">Task Management</h5>
        <p className="mb-1">© {new Date().getFullYear()} All Rights Reserved</p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link href="#" className="text-white text-decoration-none">Privacy Policy</Link>
          <Link href="#" className="text-white text-decoration-none">Terms</Link>
          <Link href="#" className="text-white text-decoration-none">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
