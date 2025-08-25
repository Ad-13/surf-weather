import { AppProviders } from '@providers/AppProviders';
import { AppRouter } from '@router/AppRouter';
import Toast from '@ui/Toast';

const App: React.FC = () => {
  return (
    <AppProviders>
      <Toast />
      <AppRouter />
    </AppProviders>
  );
};

export default App;
