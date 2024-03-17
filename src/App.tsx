import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedLayout from "./components/layout/ProtectedLayout";

const App = createBrowserRouter(
  // * Tidak bisa pake Routes lagi jadi pake <> aja karena sekarang pake createBrowserRouter
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>
    </>
  )
);
export default App;
