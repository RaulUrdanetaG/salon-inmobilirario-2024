import { useRoutes, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/Landing";

const AppRoutes = () => {
  const routes = useRoutes([{ path: "/", element: <LandingPage /> }]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
