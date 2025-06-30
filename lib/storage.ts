// auth-storage.tsx
import { useState, useEffect } from 'react';

// Type definitions
export interface User {
  id: string;
  createdAt: string;
}

export interface Store {
  _id: string;
  name: string;
  owner: string;
  address: {
    city: string;
    address: string;
    state: string;
  };
  mainGood: string;
  descr: string;
  avgRating: number;
  isOpen: boolean;
  imgs: string[];
  ratings: any[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  accessExpiration: string;
  accessToken: string;
  refreshExpiration: string;
  refreshToken: string;
  store: Store | null;
  user: User;
}

export interface AuthResponse {
  data: AuthData;
  message: string;
}

// Storage key constant
const AUTH_STORAGE_KEY = 'loginResponse';

// Helper functions to get data from localStorage
export const getAuthData = (): AuthResponse | null => {
  try {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error getting auth data from localStorage:', error);
    return null;
  }
};

export const getAccessToken = (): string | null => {
  const authData = getAuthData();
  return authData?.data?.accessToken || null;
};

export const getRefreshToken = (): string | null => {
  const authData = getAuthData();
  return authData?.data?.refreshToken || null;
};

export const getUser = (): User | null => {
  const authData = getAuthData();
  return authData?.data?.user || null;
};

export const getUserId = (): string | null => {
  const authData = getAuthData();
  return authData?.data?.user?.id || null;
};

export const getStore = (): Store | null => {
  const authData = getAuthData();
  return authData?.data?.store || null;
};

export const getStoreId = (): string | null => {
  const store = getStore();
  return store?._id || null;
};

export const getStoreName = (): string | null => {
  const store = getStore();
  return store?.name || null;
};

export const getAccessExpiration = (): string | null => {
  const authData = getAuthData();
  return authData?.data?.accessExpiration || null;
};

export const getRefreshExpiration = (): string | null => {
  const authData = getAuthData();
  return authData?.data?.refreshExpiration || null;
};

// Token validation functions
export const isAccessTokenExpired = (): boolean => {
  const expiration = getAccessExpiration();
  if (!expiration) return true;

  const expirationTime = new Date(expiration);
  const currentTime = new Date();

  return currentTime >= expirationTime;
};

export const isRefreshTokenExpired = (): boolean => {
  const expiration = getRefreshExpiration();
  if (!expiration) return true;

  const expirationTime = new Date(expiration);
  const currentTime = new Date();

  return currentTime >= expirationTime;
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return !!(accessToken && refreshToken && !isRefreshTokenExpired());
};

export const getAccessTokenTimeLeft = (): number => {
  const expiration = getAccessExpiration();
  if (!expiration) return 0;

  const expirationTime = new Date(expiration);
  const currentTime = new Date();
  const timeDiff = expirationTime.getTime() - currentTime.getTime();

  return Math.max(0, Math.floor(timeDiff / (1000 * 60))); // Convert to minutes
};

// Storage management functions
export const setAuthData = (authResponse: AuthResponse): boolean => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authResponse));
    return true;
  } catch (error) {
    console.error('Error setting auth data to localStorage:', error);
    return false;
  }
};

export const clearAuthData = (): boolean => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing auth data from localStorage:', error);
    return false;
  }
};

// React Hook for managing auth state
export const useAuth = () => {
  const [authData, setAuthDataState] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = () => {
      const data = getAuthData();
      setAuthDataState(data);
      setIsLoading(false);
    };

    loadAuthData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        loadAuthData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateAuthData = (newAuthData: AuthResponse) => {
    if (setAuthData(newAuthData)) {
      setAuthDataState(newAuthData);
      return true;
    }
    return false;
  };

  const clearAuth = () => {
    if (clearAuthData()) {
      setAuthDataState(null);
      return true;
    }
    return false;
  };

  return {
    authData,
    isLoading,
    isAuthenticated: isAuthenticated(),
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    user: getUser(),
    userId: getUserId(),
    store: getStore(),
    storeId: getStoreId(),
    storeName: getStoreName(),
    isAccessTokenExpired: isAccessTokenExpired(),
    isRefreshTokenExpired: isRefreshTokenExpired(),
    accessTokenTimeLeft: getAccessTokenTimeLeft(),
    updateAuthData,
    clearAuth,
    refreshData: () => setAuthDataState(getAuthData()),
  };
};
