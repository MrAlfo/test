import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './auth.scss';
import Logo from '../../assets/logo.png';

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  borderRadius: theme.spacing(2),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
}));

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Geçerli bir e-posta adresi giriniz.')
        .required('E-posta gereklidir.'),
      password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır.')
        .required('Şifre gereklidir.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor.')
        .required('Şifre onayı gereklidir.'),
    }),
    onSubmit: (values) => {
      dispatch(register({ email: values.email, password: values.password }))
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch(() => {
          // Redux error state kullanılıyor
        });
    },
  });

  return (
    <SignInContainer justifyContent="center" alignItems="center">
      <CssBaseline />
      <Card>
        <Box textAlign="center">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '192px', marginBottom: '16px' }}
          />
          <Typography variant="h5" fontWeight="bold">
            Kayıt Ol
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleClickShowPassword}
                    size="small"
                    sx={{ minWidth: 'fit-content' }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                ),
              }}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••"
              variant="outlined"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleClickShowConfirmPassword}
                    size="small"
                    sx={{ minWidth: 'fit-content' }}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                ),
              }}
              fullWidth
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formik.isValid || !formik.dirty || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Kayıt Ol'}
          </Button>
        </Box>
        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}
        <Typography textAlign="center" mt={2}>
          Zaten hesabınız var mı?{' '}
          <Link
            onClick={() => navigate('/login')}
            sx={{ cursor: 'pointer', color: 'primary.main' }}
          >
            Giriş Yap
          </Link>
        </Typography>
      </Card>
    </SignInContainer>
  );
};

export default RegisterPage;
