import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function DefaultLayout() {
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: 'var(--navbar-height)',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default DefaultLayout;
