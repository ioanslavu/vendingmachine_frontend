import { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import useAuth from "../../hooks/useAuth";
import { buy, getProducts } from "../../services/Product.service";
import { IProduct, IProductRequest } from "../IProduct";

interface ICart {
  product: IProduct;
  amount: number;
}
function ProductsList() {
  const auth = useAuth();
  const [products, setProducts] = useState<IProduct | any>([]);
  const [cart, setCart] = useState<ICart | any>();
  const [message, setMessage] = useState<string>();
  const [change, setChange] = useState<[]>();

  useEffect(() => {
    getProducts()
      .then((data) =>
        data.map((row: IProductRequest) => ({
          id: row.productId,
          productName: row.productName,
          cost: row.cost,
          amountAvailable: row.amountAvailable,
        }))
      )
      .then((data) => setProducts(data));
  }, []);

  const validateBalance = (amount: number) => auth.user.deposit > amount;

  const addToCart = (product: IProduct) => {
    if (validateBalance(product.cost)) {
      setCart({ product, amount: 1 });
      setMessage("");
    } else {
      setMessage("Insufficient Balance");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const updateCartAmount = (newAmount: number) => {
    if (newAmount <= 0) {
      setCart(null!);
      return;
    }
    if (newAmount > cart.product.amountAvailable) {
      setMessage("Insufficient amount available");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    if (validateBalance(cart.product.cost * newAmount)) {
      setCart({ product: cart.product, amount: newAmount });
      setMessage("");
    } else {
      setMessage("Insufficient Balance");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const buyProduct = () => {
    if (!cart) {
      setMessage("Please add products to cart");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    if (!validateBalance(cart.product.cost * cart.amount)) {
      setMessage("Insufficient Balance");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    setMessage("");
    buy(cart.product.id, cart.amount).then(
      (data) => {
        setProducts(
          products.map((row: IProduct) =>
            row.id === cart.product.id
              ? { ...row, amountAvailable: row.amountAvailable - cart.amount }
              : row
          )
        );
        setCart(null!);
        auth.setUser({ ...auth.user, deposit: 0 });
        setChange(data.change);
        setMessage("Successfully bought");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setTimeout(() => {
          setChange(null!);
        }, 8000);
        // update product available amount in product state
      },
      (error) => {
        let resMessage: string = "";
        if (error.response.status === 401) {
          resMessage = "Invalid username or password!";
        } else {
          resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        }
        setMessage(resMessage);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    );
  };

  return (
    <Grid container spacing={2} mt={4}>
      <Grid container>
        {cart?.amount > 0 && (
          <Grid item>
            <Typography sx={{ mb: 2 }}>Product: {cart.product.productName}</Typography>
            <Grid container direction="row" alignItems="center">
              Amount:
              <IndeterminateCheckBoxIcon
                fontSize="small"
                color="info"
                sx={{ ml: 1, mr: 1 }}
                onClick={() => updateCartAmount(cart.amount - 1)}
              />
              {cart.amount}
              <AddBoxIcon
                fontSize="small"
                color="info"
                sx={{ ml: 1 }}
                onClick={() => updateCartAmount(cart.amount + 1)}
              />
            </Grid>
            <Typography sx={{ mb: 2 }}>Total: {cart.product.cost * cart.amount}</Typography>
            <Button variant="contained" color="success" onClick={buyProduct}>
              <Typography>Buy</Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container>{message && <Typography variant="h6">{message}</Typography>}</Grid>
      <Grid container>
        {change && (
          <Typography variant="h6">
            Your change coins: {change.map((coin) => `${coin} `)}
          </Typography>
        )}
      </Grid>
      {products.map((product: any) => (
        <Grid item xs={3} key={product.id}>
          <Card sx={{ minWidth: 120, height: 120 }}>
            <CardContent onClick={() => addToCart(product)}>
              <Typography
                variant="h5"
                component="div"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {product.productName}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Price: {product.cost}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Amount available:{" "}
                {product.amountAvailable ? product.amountAvailable : "Out of stock."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsList;
