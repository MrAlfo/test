import React, { useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import CategoryModal from "../CategoryModal/CategoryModal";

const categories = [
  {
    label: "Yaş",
    options: ["Yaş sınırı yok", "0-2 Yaş", "2-4 Yaş", "4-6 Yaş", "6-8 Yaş", "8-10 Yaş", "10-12 Yaş"],
    color: "#9ECBA6",
  },
  {
    label: "Kategori",
    options: ["Anaokulu ve Kreşler", "Atölyeler", "Cafe ve Restoranlar", "Etkinlikler", "Gezilecek Yerler"],
    color: "#E6C05A",
  },
  {
    label: "Konum",
    fields: ["Şehir Seçin", "İlçe Seçin"],
    color: "#D79D70",
  },
  {
    label: "Format",
    options: ["Yüz Yüze", "Çevrimiçi", "Önceden Kaydedilmiş"],
    color: "#E5A9B1",
  },
  {
    label: "Ücretli",
    options: ["Ücretli", "Ücretsiz"],
    color: "#91B6C0",
  },
  {
    label: "Tarih",
    color: "#D89C9C",
  },
  {
    label: "Gün",
    color: "#91BDD9",
  },
  {
    label: "Fiyat",
    color: "#83B190",
  },
  {
    label: "Park Yeri",
    color: "#D99E5C",
  },
];

const Categories: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleOpen = (category: any) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        sx={{
          mt: 4,
          padding: "0 16px",
        }}
      >
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}
              >
                {category.label}
              </Typography>
            }
            onClick={() => handleOpen(category)}
            sx={{
              backgroundColor: category.color,
              color: "#ffffff",
              borderRadius: "16px",
              padding: "10px 16px",
              fontSize: "16px",
              fontWeight: 600,
              minWidth: "120px",
              textAlign: "center",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      {selectedCategory && (
        <CategoryModal
          open={open}
          onClose={handleClose}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default Categories;
