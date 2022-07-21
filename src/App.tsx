import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import LoginPage from "./components/Auth/Login";
import LogoutAll from "./components/Auth/LogoutAll";
import RegisterPage from "./components/Auth/Register";
import RequireAuth from "./components/RequireAuth";
import { getCurrentUser } from "./services/Auth.service";
import useAuth from "./hooks/useAuth";
import Layout, { RoleRouter } from "./components/Layout";
import CreateProductForm from "./components/Seller/CreateProductForm";
import RequireAuthSeller from "./components/RequireAuthSeller";
import EditProductForm from "./components/Seller/EditProductForm";

export default function App() {
  const authUser = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUser();
      if (data) {
        authUser.setUser(data);
      }
      setLoading(false);
    };
    getUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logoutall" element={<LogoutAll />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <RoleRouter />
              </RequireAuth>
            }
          />
          <Route
            path="/createProduct"
            element={
              <RequireAuthSeller>
                <CreateProductForm />
              </RequireAuthSeller>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <RequireAuthSeller>
                <EditProductForm />
              </RequireAuthSeller>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}
