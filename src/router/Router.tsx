import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import useUserStatus from '../hooks/useUserStatus';
import Alerts from '../pages/Alerts/Alerts';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardLayout from '../pages/DashboardLayout/DashboardLayout';
import DefaultLayout from '../pages/DefaultLayout';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Inventory from '../pages/Inventory/Inventory';
import InventoryLog from '../pages/InventoryLog/InventoryLog';
import Loading from '../pages/Loading/Loading';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import UserTable from '../pages/UserTable/UserTable';

// TODO: Implement Auth Middleware for restricted routes

function Router() {
  const { pathname } = useLocation();
  const { isLoading, isError } = useUserStatus();

  // Function to scroll to top when url changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="users" element={<UserTable />} />
        <Route path="log" element={<InventoryLog />} />
        <Route path="alert" element={<Alerts />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
