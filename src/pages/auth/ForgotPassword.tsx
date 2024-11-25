import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.scss';
import Logo from '../../assets/icon.png';

const ForgotPasswordPage: React.FC = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Geçerli bir e-posta adresi giriniz.')
                .required('E-posta gereklidir.'),
        }),
        onSubmit: (values) => {
            dispatch(forgotPassword({ email: values.email }))
                .unwrap()
                .then(() => {
                    setSuccessMessage('Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin.');
                })
                .catch(() => {
                    setSuccessMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
                });
        },
    });

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <Container
            maxWidth="xl"
            className="login-container"
        >
            <Box
                maxWidth={"600px"}
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '16px',
                    p: 4,
                    width: '100%',
                }}
            >
                <Box className="login-box">
                    <img
                        className="login-logo"
                        src={Logo}
                        alt="Logo"
                        style={{ width: '100px', marginBottom: '16px' }}
                    />
                </Box>
                <Typography variant="h5" gutterBottom>
                    Şifremi Unuttum
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, mb: 2 }}
                >
                    Şifrenizi sıfırlamak için e-posta adresinizi girin.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="E-posta"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="E-posta adresinizi giriniz"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Şifre Sıfırlama E-postası Gönder'}
                    </Button>
                </form>
                {successMessage && (
                    <Typography
                        variant="body2"
                        color="success"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        {successMessage}
                    </Typography>
                )}
                {error && (
                    <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        {error}
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    align="right"
                    sx={{ mt: 2, cursor: 'pointer' }}
                    color="primary"
                    onClick={handleLoginRedirect}
                >
                    Giriş Yap
                </Typography>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
