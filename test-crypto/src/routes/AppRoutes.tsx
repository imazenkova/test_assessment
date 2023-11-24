import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainTablePage from '../pages/MainTablePage/MainTablePage';


const AppRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path={'/'} element={<MainTablePage />}/>
    </Routes>
  )
};

export default AppRoutes;
