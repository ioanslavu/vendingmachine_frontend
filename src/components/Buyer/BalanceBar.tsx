import { Box, Button, Toolbar, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { deposit, resetBalance } from "../../services/User.service";

function BalanceBar() {
  const auth = useAuth();
  const resetBalanceButton = () => {
    auth.setUser({ ...auth.user, deposit: 0 });
    resetBalance();
  };
  const updateBalanceButton = (amount: number) => {
    auth.setUser({ ...auth.user, deposit: auth.user.deposit + amount });
    deposit(amount);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Balance: {auth.user.deposit}
        </Typography>
        Deposit some coins:
        <Button sx={{ ml: 2 }} variant="contained" onClick={() => updateBalanceButton(5)}>
          5
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={() => updateBalanceButton(10)}>
          10
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={() => updateBalanceButton(20)}>
          20
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={() => updateBalanceButton(50)}>
          50
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={() => updateBalanceButton(100)}>
          100
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={resetBalanceButton}>
          Reset
        </Button>
      </Toolbar>
    </Box>
  );
}

export default BalanceBar;
