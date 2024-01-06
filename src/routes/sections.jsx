import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const CardPage = lazy(() => import('src/pages/cards'));
export const EditCard = lazy(() => import('src/pages/edit-card'));
export const VacancyPage = lazy(() => import('src/pages/vacancy'));
export const EditVacancyPage = lazy(() => import('src/pages/edit-vacancy'));
export const AddnewVacancyPage = lazy(() => import('src/pages/add-vacancy'));

// ----------------------------------------------------------------------

export default function Router() {
  const auth = true;

  const routes = [
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/add-new-card', element: <CardPage /> },
        { path: 'products/:id', element: <EditCard /> },
        { path: 'vacancy', element: <VacancyPage /> },
        { path: 'vacancy/:id', element: <EditVacancyPage /> },
        { path: 'vacancy/add-new-vacancy', element: <AddnewVacancyPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ];

  const authenticatedRoutes = auth
    ? routes
    : [
        { path: 'login', element: <LoginPage /> },
        { path: '*', element: <Navigate to="/login" replace /> },
      ];

  return useRoutes(authenticatedRoutes);
}
