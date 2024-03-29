import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import CreateTag from "./pages/CreateTag";
import NotFoundPage from "./pages/NotFoundPage";
import CreateStudy from "./pages/CreateStudy";
import AuthLayout from "./components/layout/AuthLayout";
import CreateNote from "./pages/CreateNote";

const App = createBrowserRouter(
  // * Tidak bisa pake Routes lagi jadi pake <> aja karena sekarang pake createBrowserRouter
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/create-tag" element={<CreateTag />} />
        <Route path="/create-study" element={<CreateStudy />} />
      </Route>
      <Route path="/*" errorElement={<NotFoundPage />} />
    </>
  )
);
export default App;
