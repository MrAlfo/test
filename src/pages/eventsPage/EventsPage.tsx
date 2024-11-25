/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Pagination,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../redux/mainSlice";
import { RootState, AppDispatch } from "../../redux/store";
import EventCard from "../../components/EventCards/EventCard";
import "./EventsPage.scss";

// Yaş enum mapping'i
const ageMapping: { [key: string]: number } = {
  "0-2 Yaş": 0,
  "2-4 Yaş": 1,
  "4-6 Yaş": 2,
  "6-8 Yaş": 3,
  "8-10 Yaş": 4,
  "10-12 Yaş": 5,
  "12+ Yaş": 6,
};

const categories = [
  {
    label: "Yaş",
    options: ["0-2 Yaş", "2-4 Yaş", "4-6 Yaş", "6-8 Yaş", "8-10 Yaş", "10-12 Yaş", "12+ Yaş"],
  },
  {
    label: "Kategori",
    options: ["Anaokulu ve Kreşler", "Atölyeler", "Cafe ve Restoranlar", "Etkinlikler", "Gezilecek Yerler"],
  },
  {
    label: "Konum",
    fields: ["Şehir", "İlçe"],
  },
  {
    label: "Ücret",
    options: ["Ücretsiz", "Ücretli"],
  },
  {
    label: "Fiyat",
  },
  {
    label: "Tarih",
  },
];

const EventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activities, loading, error } = useSelector((state: RootState) => state.main);

  const [filters, setFilters] = useState<any>({
    listing: {
      ageInterval: [], // Yaş aralıkları enum olarak tutulacak
      category: [],
    },
    location: {
      city: null,
      district: null,
    },
    fee: null,
    price: {
      from: null,
      to: null,
    },
    schedule: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState<string>("");

  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const pagination = {
      page: currentPage,
      pageSize: itemsPerPage,
      sort: sortBy,
    };

    dispatch(fetchActivities({ filter: {}, pagination }));
  }, [dispatch, currentPage, sortBy]);

  const handleFilterApply = () => {
    const pagination = {
      page: currentPage,
      pageSize: itemsPerPage,
      sort: sortBy,
    };

    dispatch(fetchActivities({ filter: filters, pagination }));
  };

  const handleFilterChange = (category: string, value: string) => {
    if (category === "Yaş") {
      // Yaş enumlarını ekleyip çıkarma
      setFilters((prev: any) => ({
        ...prev,
        listing: {
          ...prev.listing,
          ageInterval: prev.listing.ageInterval.includes(ageMapping[value])
            ? prev.listing.ageInterval.filter((age: number) => age !== ageMapping[value])
            : [...prev.listing.ageInterval, ageMapping[value]],
        },
      }));
    } else if (category === "Kategori") {
      setFilters((prev: any) => ({
        ...prev,
        listing: {
          ...prev.listing,
          category: prev.listing.category.includes(value)
            ? prev.listing.category.filter((cat: string) => cat !== value)
            : [...prev.listing.category, value],
        },
      }));
    } else if (category === "Ücret") {
      setFilters((prev: any) => ({
        ...prev,
        fee: value === "Ücretsiz" ? "free" : "paid",
      }));
    }
  };

  const handlePriceChange = (field: "from" | "to", value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      price: {
        ...prev.price,
        [field]: value ? Number(value) : null,
      },
    }));
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    handleFilterApply(); // Sayfa değişiminde API isteği gönder
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const totalPages = Math.ceil(activities.count / itemsPerPage);

  return (
    <Box className="page-container">
      <Box className="filter-section">
        <Typography variant="h6">Filter By</Typography>
        {categories.map((category, index) => (
          <Box key={index} className="filter-category">
            <Typography className="filter-title">{category.label}</Typography>
            {category.options &&
              category.options.map((option, i) => (
                <Box key={i} className="filter-option">
                  <FormControlLabel
                    control={<Checkbox />}
                    label={option}
                    onChange={() => handleFilterChange(category.label, option)}
                  />
                </Box>
              ))}
            {category.label === "Fiyat" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Min"
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => handlePriceChange("from", e.target.value)}
                />
                <TextField
                  label="Max"
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => handlePriceChange("to", e.target.value)}
                />
              </Box>
            )}
          </Box>
        ))}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <button
            onClick={handleFilterApply}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Filtrele
          </button>
        </Box>
      </Box>

      <Box className="results-section">
        <Box className="results-header" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Result {activities.count}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => setView("grid")}>
              <ViewModuleIcon color={view === "grid" ? "primary" : "inherit"} />
            </IconButton>
            <IconButton onClick={() => setView("list")}>
              <ViewListIcon color={view === "list" ? "primary" : "inherit"} />
            </IconButton>
            <Select
              value={sortBy}
              onChange={(event: SelectChangeEvent<string>) => handleSortChange(event)}
              className="sort-select"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Sort By
              </MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="date-asc">Date: Oldest to Newest</MenuItem>
              <MenuItem value="date-desc">Date: Newest to Oldest</MenuItem>
            </Select>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {activities.data.map((activity: any) => (
            <Grid item xs={12} md={view === "grid" ? 6 : 12} lg={view === "grid" ? 4 : 12} key={activity._id}>
              <EventCard
                image="https://via.placeholder.com/150"
                title={activity.title}
                ageGroup={activity.listing.ageInterval?.join(" - ") || "Belirtilmemiş"}
                location={`${activity.location.city} / ${activity.location.district}`}
                date={`${new Date(activity.schedule.startDate).toLocaleDateString()} - ${new Date(
                  activity.schedule.endDate
                ).toLocaleDateString()}`}
                time={`${activity.duration} dakika`}
                price={activity.fee === "free" ? "Ücretsiz" : `${activity.price}₺`}
                organizer={activity.listing.exteriorOrganizer?.name || "Bilinmiyor"}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default EventsPage;
