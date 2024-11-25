import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
} from "@mui/material";

const filters = [
  { label: "Category", options: ["Clothes", "Shoes", "Bag", "Electronics"] },
  { label: "Brand", options: ["Brand A", "Brand B", "Brand C"] },
  { label: "Price", type: "slider", min: 0, max: 1000 },
];

interface SidebarProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedFilters, setSelectedFilters }) => {
  const handleFilterChange = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <Box sx={{ width: "25%", borderRight: "1px solid #ddd", pr: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Filters
      </Typography>
      {filters.map((filter, index) => (
        <Box key={index} mb={3}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {filter.label}
          </Typography>
          {filter.type === "slider" ? (
            <Slider
              min={filter.min}
              max={filter.max}
              defaultValue={filter.max / 2}
              valueLabelDisplay="auto"
            />
          ) : (
            <FormGroup>
              {filter.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={selectedFilters.includes(option)}
                      onChange={() => handleFilterChange(option)}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          )}
        </Box>
      ))}
      <Button variant="contained" fullWidth>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Sidebar;
