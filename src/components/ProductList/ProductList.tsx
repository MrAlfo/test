import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";

const mockProducts = Array(7).fill({
  title: "Product Title",
  description: "Short description of the product.",
  price: "$85.00",
  imageUrl: "https://via.placeholder.com/150",
});

const ProductList: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {mockProducts.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <img src={product.imageUrl} alt={product.title} style={{ width: "100%" }} />
            <Box p={2}>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                {product.description}
              </Typography>
              <Typography variant="h5" sx={{ color: "#000", mb: 2 }}>
                {product.price}
              </Typography>
              <Button variant="contained" fullWidth>
                View Details
              </Button>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
