import'./App.scss';
import Header from './components/header/Header';
import BackpackCoinsProvider from './context/BackpackCoinsProvider';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <div className="wrapper">
      <BackpackCoinsProvider>
        <Header />
        <AppRoutes />
      </BackpackCoinsProvider>
    </div>
  );
}

export default App;