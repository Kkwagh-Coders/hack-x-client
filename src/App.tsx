import { Toaster } from 'react-hot-toast';
import Router from './router/Router';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 80,
          zIndex: 100000,
        }}
      />

      <Router />
    </>
  );
}

export default App;
