import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TextField, Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { IProductResponse } from "../IProduct";
import { createProduct } from "../../services/Product.service";

function CreateProductForm() {
  const navigate = useNavigate();
  const goBack = () => navigate("/", { replace: true });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required!"),
    cost: Yup.number().positive("Price should be greater than 0").required("Cost is required!"),
    amountAvailable: Yup.number()
      .positive("Amount should be greater than 0")
      .required("Amount available is required!"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      cost: 0,
      amountAvailable: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      const product: IProductResponse = values;
      setMessage("");
      setLoading(true);
      createProduct(product).then(
        (data) => {
          if (data.status === true) {
            setLoading(false);
            navigate("/", { replace: true });
          } else {
            setMessage(data.message);
            setLoading(false);
          }
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    },
  });

  if (loading) {
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
          Loading..
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box mt={10}>
        <Button variant="outlined" onClick={goBack}>
          Back
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Product
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            autoComplete="productName"
            autoFocus
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            helperText={formik.touched.productName && formik.errors.productName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cost"
            label="Price"
            type="number"
            id="cost"
            value={formik.values.cost}
            onChange={formik.handleChange}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            helperText={formik.touched.cost && formik.errors.cost}
          />{" "}
          <TextField
            margin="normal"
            required
            fullWidth
            name="amountAvailable"
            label="Amount Available"
            id="amountAvailable"
            type="number"
            value={formik.values.amountAvailable}
            onChange={formik.handleChange}
            error={formik.touched.amountAvailable && Boolean(formik.errors.amountAvailable)}
            helperText={formik.touched.amountAvailable && formik.errors.amountAvailable}
          />
          {message && (
            <Typography component="h1" variant="h5">
              {message}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CreateProductForm;
