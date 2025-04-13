import React from 'react';
import { Routes, Route } from 'react-router-dom';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/admin/*" element={<div>Admin Pages</div>} />
      <Route path="/auth/*" element={<div>Authentication Pages</div>} />
      <Route path="/customer/*" element={<div>Customer Pages</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default MainRoutes; 