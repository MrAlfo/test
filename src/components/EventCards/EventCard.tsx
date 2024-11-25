import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const EventCard = ({
  image,
  title,
  ageGroup,
  location,
  date,
  time,
  price,
  organizer,
}: {
  image: string;
  title: string;
  ageGroup: string;
  location: string;
  date: string;
  time: string;
  price: string;
  organizer: string;
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mb: 2,
        boxShadow: 3,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Resim Alanı */}
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120 }}
        image={image}
        alt={title}
      />
      {/* İçerik Alanı */}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {/* Başlık */}
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
          {title}
        </Typography>
        {/* Yaş Grubu */}
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem' }}>
          {ageGroup}
        </Typography>
        {/* Lokasyon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            {location}
          </Typography>
        </Box>
        {/* Tarih ve Saat */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            {time}
          </Typography>
        </Box>
        {/* Fiyat */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonetizationOnIcon fontSize="small" color="action" />
          <Typography
            variant="body2"
            color={Number(price.replace('₺', '').trim()) === 0 ? 'green' : 'error'}
            fontWeight={600}
          >
            {price}
          </Typography>
        </Box>
        {/* Düzenleyici */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {organizer}
        </Typography>
        {/* Buton */}
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ mt: 1, alignSelf: 'flex-start' }}
        >
          TIKLA
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
