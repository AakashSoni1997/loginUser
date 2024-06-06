import Login from "./components/Login";
import Signup from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserLoginList from "./components/UserLoginList";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/userloginlist" element={<UserLoginList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
