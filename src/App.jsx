import { AppLayout } from './components/layout/AppLayout';
import { CryptoContextProvider } from './context/CryptoContext';

export const App = () => (
  <CryptoContextProvider>
    <AppLayout />
  </CryptoContextProvider>
);