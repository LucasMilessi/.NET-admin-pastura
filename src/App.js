import { Dashboard } from "./pages/Dashboard";
import "./style/app.css"
import { Login } from "./components/login/Login.js"
import { Logout } from "./components/login/Logout.js"
import { Profile } from "./components/login/Profile.js"

function App() {
  return (
    <div>
      <Login/>
      <Profile/>
      <Logout/>
      <Dashboard />
    </div>
  );
}

export default App;
