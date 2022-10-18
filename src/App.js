import "./style/app.css"

import { useAuth0 } from '@auth0/auth0-react';
import { Dashboard } from "./pages/Dashboard";

function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <Dashboard user={ user } />
    );
  } else {
    return loginWithRedirect();
  }
}
export default App;
