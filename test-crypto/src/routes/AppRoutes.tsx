import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainTablePage from '../pages/MainTablePage/MainTablePage';
import { RoutesPath } from '../types/RoutesTypes';
import ErrorIDPage from '../pages/ErrorIDPage/ErrorPage';
import ErrorUrlPage from '../pages/ErrorUrlPage/ErrorUrlPage';
import EntityDetailsPage from '../pages/EntityDetailsPage/EntityDetailsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={RoutesPath.CURRENCY_TABLE} />} />
      <Route path={RoutesPath.CURRENCY_TABLE} element={<MainTablePage />} />
      <Route path={`${RoutesPath.ENTITY_DETAILS}/:id`} element={<EntityDetailsPage />} />
      <Route path={`${RoutesPath.ENTITY_DETAILS}/:id/error`} element={<ErrorIDPage />} />
      <Route path="*" element={<ErrorUrlPage />} />
    </Routes>
  )
};

export default AppRoutes;
