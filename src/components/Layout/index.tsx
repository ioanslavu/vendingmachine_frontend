import { Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../../common/Roles";
import useAuth from "../../hooks/useAuth";
import BuyerPage from "../Buyer";
import SellerPage from "../Seller";
import Copyright from "./Copyright";
import TopBar from "./TopBar";

export function RoleRouter() {
  const { ...user } = useAuth().user;
  console.log(user.role);
  if (user.role === Role.Buyer) {
    return <BuyerPage />;
  }
  if (user.role === Role.Seller) {
    return <SellerPage />;
  }
  return <Navigate to="/login" replace />;
}

function Layout() {
  return (
    <>
      <TopBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <Copyright />
    </>
  );
}

export default Layout;
