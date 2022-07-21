import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../services/Auth.service";

function TopBar() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    logout().then(() => {
      auth.setUser(null!);
      navigate("/login", { replace: true });
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hi {auth.user.username}!
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
