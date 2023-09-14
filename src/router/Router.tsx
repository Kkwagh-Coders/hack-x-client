import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import useUserStatus from '../hooks/useUserStatus';
import DashboardLayout from '../pages/DashboardLayout/DashboardLayout';
import DefaultLayout from '../pages/DefaultLayout';
import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Loading from '../pages/Loading/Loading';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Register from '../pages/Register/Register';

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
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Home />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
