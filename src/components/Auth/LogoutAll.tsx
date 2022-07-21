import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { logoutAll } from "../../services/Auth.service";

function LogoutAll() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    logoutAll().then(() => {
      auth.setUser(null!);
      navigate("/login", { replace: true });
    });
  };
  const handleContinue = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        There is already an active session using your account.
      </Typography>
      <Typography component="h1" variant="h5">
        Would you like to terminate all the active sessions?
      </Typography>
      <Stack spacing={1} direction="row" margin={10}>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="contained" onClick={handleContinue}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
}

export default LogoutAll;
