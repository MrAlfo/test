import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginParent, registerParent, forgotPassword as forgotPasswordApi } from '../services/authService';

// Define response types
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
}

// Define state type
interface AuthState {
  user: AuthResponse['user'] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Login thunk
export const login = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: ErrorResponse }>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginParent(email, password);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);

// Register thunk
export const register = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: ErrorResponse }>(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await registerParent(email, password);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.response.data.message });
    }
  }
);

// Reset password thunk
export const forgotPassword = createAsyncThunk<AuthResponse, { email: string; }, { rejectValue: ErrorResponse }>(
    'auth/resetPassword',
    async ({ email }, thunkAPI) => {
      try {
        const response = await forgotPasswordApi(email);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ message: error.response.data.message });
      }
    }
  );
  

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Login failed';
      })

      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Registration failed';
      });
  },
});

export default authSlice.reducer;
