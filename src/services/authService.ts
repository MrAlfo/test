import axios from 'axios';

const API_URL = 'https://api.hophop.com.tr/auth';

export const loginParent = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerParent = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      role: 'parent',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resetpassword`, {
      token,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/requestresetpassword`, {
        email: email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };