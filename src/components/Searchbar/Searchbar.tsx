import React from 'react';
import { Box, InputBase, Select, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import './Searchbar.scss'

const SearchBarWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '4px',
  overflow: 'hidden',
});

const SearchInput = styled(InputBase)({
  padding: '8px 16px',
  flex: 1,
  fontSize: '16px',
  color: '#8A8A8A',
  '& input::placeholder': {
    color: '#B0B0B0',
  },
});

const CategorySelect = styled(Select)({
  minWidth: '150px',
  borderLeft: '1px solid #E0E0E0',
  padding: '0 16px',
  color: '#8A8A8A',
  '.MuiSelect-icon': {
    color: '#8A8A8A',
  },
});

const SearchButton = styled(Button)({
  backgroundColor: '#FF7F50',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 24px',
  borderRadius: '0 12px 12px 0',
  '&:hover': {
    backgroundColor: '#FF6347',
  },
});

const CustomSearchBar: React.FC = () => {
  return (
    <SearchBarWrapper>
      <SearchIcon style={{ margin: '0 8px', color: '#8A8A8A' }} />
      <SearchInput placeholder="Enter Keyword" />
      <SearchButton>Search</SearchButton>
    </SearchBarWrapper>
  );
};

export default CustomSearchBar;
