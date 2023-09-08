import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../pages/DefaultLayout';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';

function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
