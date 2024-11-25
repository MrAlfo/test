import React, { useEffect } from 'react';
import { Box, Grid, Typography, CardActionArea, Container, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { dashboardComponents } from '../../redux/mainSlice';

const Featured: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.main);

    useEffect(() => {
        dispatch(dashboardComponents());
    }, [dispatch]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    if (!users || users.length === 0 || !users[0].categories) {
        return <Typography>No data available</Typography>;
    }

    const renderSectionTitle = (title: string) => (
        <Box sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: '#333',
                    textTransform: 'uppercase',
                    mb: 2,
                }}
            >
                {title}
            </Typography>
            <Divider
                sx={{
                    width: '80px',
                    height: '4px',
                    backgroundColor: '#007BFF',
                    margin: '0 auto',
                    borderRadius: '2px',
                }}
            />
        </Box>
    );

    const renderCards = (categories: any[]) => (
        <Grid container spacing={4}>
            {categories.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardActionArea
                        sx={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        onClick={() => {
                            window.location.href = `/details/${item._id}`;
                        }}
                    >
                        <Box
                            sx={{
                                backgroundImage: `url(${item.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '200px',
                                filter: 'brightness(0.8)',
                                transition: 'filter 0.3s ease',
                                '&:hover': {
                                    filter: 'brightness(1)',
                                },
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                padding: '16px',
                                color: '#fff',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {item._id}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {item.description}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {renderSectionTitle('Popüler Kategoriler')}
            {renderCards(users[0].categories)}

            {renderSectionTitle('Öne Çıkan Kategoriler')}
            {renderCards(users[1].categories)}

            {renderSectionTitle('Gezi ve Seyahat')}
            {renderCards(users[2].categories)}
        </Container>
    );
};

export default Featured;
