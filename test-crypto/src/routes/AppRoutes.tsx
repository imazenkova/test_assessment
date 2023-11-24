import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainTablePage from '../pages/MainTablePage/MainTablePage';
import { RoutesPath } from '../types/Routes';
import EntityDetailsPage from '../pages/EntityDetailsPage/EntityDetailsPage';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutesPath.CURRENCY_TABLE} element={<MainTablePage />} />
      <Route path={`${RoutesPath.ENTITY_DETAILS}/:id`} element={<EntityDetailsPage />} />
    </Routes>
  )
};

export default AppRoutes;
