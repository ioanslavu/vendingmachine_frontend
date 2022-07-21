import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { deleteProduct, getMyProducts } from "../../services/Product.service";
import { IProduct, IProductRequest } from "../IProduct";

function SellerPage() {
  const [tableData, setTableData] = useState<IProduct | any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyProducts()
      .then((data) =>
        data.map((row: IProductRequest) => ({
          id: row.productId,
          productName: row.productName,
          cost: row.cost,
          amountAvailable: row.amountAvailable,
        }))
      )
      .then((data) => setTableData(data));
  }, []);

  const renderButton = (params: any) => (
    <>
      <EditIcon
        fontSize="small"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/editProduct/${params.row.id}`, { replace: true });
        }}
      />
      <DeleteIcon
        fontSize="small"
        color="error"
        onClick={(e) => {
          e.preventDefault();
          deleteProduct(params.row.id);
          setTableData(tableData.filter((data: IProduct) => data.id !== params.row.id));
        }}
      />
    </>
  );

  const columns: GridColDef[] = [
    { field: "productName", headerName: "Product Name", width: 300 },
    {
      field: "amountAvailable",
      headerName: "Amount Available",
      type: "number",
      width: 170,
    },
    {
      field: "cost",
      headerName: "Cost",
      type: "number",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: renderButton,
    },
  ];

  const createProductButton = () => navigate("/createProduct", { replace: true });

  return (
    <Box mt={10}>
      <Button variant="contained" onClick={createProductButton}>
        Create New Product
      </Button>
      <div style={{ height: 600, width: "100%" }}>
        <h3>My products</h3>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </Box>
  );
}

export default SellerPage;
